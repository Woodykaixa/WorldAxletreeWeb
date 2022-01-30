import type { NextApiHandler } from 'next';
import { Cl, Err, Notice, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import { greater } from '@/lib/game-ver';
import prismaClient from '@/lib/prisma';
import imageSize from 'image-size';

import { Image } from '@/dto/image';
const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<Image.DeleteResp | Err.Resp> = async (req, res) => {
  try {
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
