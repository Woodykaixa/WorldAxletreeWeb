import type { NextApiHandler } from 'next';
import { Article, Err, OK, Wiki } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { NotFound } from '@/lib/error';
import prismaClient from '@/lib/prisma';
import objectId from 'bson-objectid';
import { ensureAuth } from '@/lib/jwt';

const {
  parser: { secondaryCheck, string, array },
} = parseParam;
const handler: NextApiHandler<Article.UpdateResp | Err.Resp> = async (req, res) => {
  try {
    await ensureAuth(req);
    await ensureMethod(req.method, ['POST']);

    const connection = prismaClient.$connect();

    const parse = parseParam<Article.UpdateDTO>(req.body, {
      id: secondaryCheck(string, param => objectId.isValid(param)),
      content: string,
      title: string,
      author: string,
      keywords: secondaryCheck(array, param => param.find(e => typeof e !== 'string') === undefined),
    });

    await connection;
    const { id, ...dto } = await parse;
    {
      const article = await prismaClient.article.findFirst({
        where: {
          id,
        },
      });
      if (!article) {
        throw new NotFound('不存在该文章，如果是有意为之，请使用创建文章功能');
      }
    }
    const date = new Date();

    const article = await prismaClient.article.update({
      where: {
        id,
      },
      data: {
        ...dto,
        date,
      },
    });
    res.status(OK.code).json(article);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
