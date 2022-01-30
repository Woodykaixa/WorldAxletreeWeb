import type { NextApiHandler } from 'next';
import { Cl, Err, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { NotFound } from '@/lib/error';
const {
  parser: { strLengthGt, secondaryCheck },
} = parseParam;
const handler: NextApiHandler<Cl.GetResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const connection = prismaClient.$connect();

    const { id } = await parseParam<Cl.GetDTO>(req.query, {
      id: strLengthGt(0),
    });
    await connection;

    const cl = await prismaClient.changelog.findFirst({
      where: {
        id,
      },
    });
    if (!cl) {
      throw new NotFound();
    }
    res.status(OK.code).send(cl);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
