import type { NextApiHandler } from 'next';
import { Err, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { NotFound } from '@/lib/error';
import prismaClient from '@/lib/prisma';
import { Image } from '@/dto/image';
const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<Image.GetResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const connection = prismaClient.$connect();

    const { name } = await parseParam<Image.GetDTO>(req.query, {
      name: strLengthGt(0),
    });
    await connection;

    const image = await prismaClient.image.findFirst({
      where: {
        name,
      },
    });
    if (!image) {
      throw new NotFound(`image ${name} not found`);
    }
    res.status(OK.code).send(image.content);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
