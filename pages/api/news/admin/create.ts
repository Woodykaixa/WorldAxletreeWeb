import type { NextApiHandler } from 'next';
import { Err, News, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { ensureAuth } from '@/lib/jwt';

const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<News.CreateResp | Err.Resp> = async (req, res) => {
  try {
    await ensureAuth(req);
    await ensureMethod(req.method, ['POST']);
    await prismaClient.$connect();

    const dto = await parseParam<News.CreateDTO>(req.body, {
      content: strLengthGt(0),
      title: strLengthGt(0),
      coverUrl: param => {
        if (param === null) {
          return {
            valid: true,
            parsed: null,
          };
        }
        return {
          valid: typeof param === 'string',
          parsed: param as string,
        };
      },
    });
    const news = await prismaClient.news.create({
      data: {
        ...dto,
        date: new Date(),
      },
    });

    res.status(OK.code).json(news);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
