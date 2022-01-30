import type { NextApiHandler } from 'next';
import { Cl, Err, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
const {
  parser: { strLengthGt, secondaryCheck },
} = parseParam;
const handler: NextApiHandler<Cl.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);
    const connection = prismaClient.$connect();

    const dto = await parseParam<{
      page: string;
      size: string;
    }>(req.query, {
      page: secondaryCheck(strLengthGt(0), param => {
        return !isNaN(parseInt(param, 10));
      }),
      size: secondaryCheck(strLengthGt(0), param => {
        return !isNaN(parseInt(param, 10));
      }),
    });

    await connection;
    const page = parseInt(dto.page);
    const size = parseInt(dto.size);
    const notices = await prismaClient.changelog.findMany({
      take: size,
      skip: size * page,
      orderBy: {
        date: 'desc',
      },
    });
    res.status(OK.code).json(notices);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
