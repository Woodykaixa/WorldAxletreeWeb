import type { NextApiHandler } from 'next';
import { Err, Notice, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { ensureAuth } from '@/lib/jwt';

const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<Notice.CreateResp | Err.Resp> = async (req, res) => {
  try {
    await ensureAuth(req);
    await ensureMethod(req.method, ['POST']);

    const connection = prismaClient.$connect();

    const parse = parseParam<Notice.CreateDTO>(req.body, {
      content: strLengthGt(0),
    });

    await connection;
    const { content } = await parse;
    const date = new Date();
    const notice = await prismaClient.notice.create({
      data: {
        content,
        date,
      },
    });
    res.status(OK.code).json(notice);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
