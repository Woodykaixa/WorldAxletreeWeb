import type { NextApiHandler } from 'next';
import { Err, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';

import { Image } from '@/dto/image';
import { ensureAuth } from '@/lib/jwt';

const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<Image.DeleteResp | Err.Resp> = async (req, res) => {
  try {
    await ensureAuth(req);
    await ensureMethod(req.method, ['DELETE']);

    const connection = prismaClient.$connect();

    const { id } = await parseParam<Image.DeleteDTO>(req.body, {
      id: strLengthGt(0),
    });
    await connection;

    const image = await prismaClient.image.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        width: true,
        height: true,
        encoding: true,
      },
    });
    res.status(OK.code).json(image);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
