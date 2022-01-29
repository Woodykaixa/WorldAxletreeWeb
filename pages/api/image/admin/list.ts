import type { NextApiHandler } from 'next';
import { Err, OK } from '@/dto';
import { errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { Image } from '@/dto/image';

const handler: NextApiHandler<Image.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    await prismaClient.$connect();

    const images = await prismaClient.image.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    res.status(OK.code).send(images);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
