import type { NextApiHandler } from 'next';
import { Article, Err, OK, Wiki } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import prismaClient from '@/lib/prisma';
import { ensureAuth } from '@/lib/jwt';

const {
  parser: { secondaryCheck, string, array },
} = parseParam;
const handler: NextApiHandler<Article.CreateResp | Err.Resp> = async (req, res) => {
  try {
    await ensureAuth(req);
    await ensureMethod(req.method, ['POST']);

    const connection = prismaClient.$connect();

    const parse = parseParam<Article.CreateDTO>(req.body, {
      content: string,
      title: string,
      author: string,
      keywords: secondaryCheck(array, param => param.find(e => typeof e !== 'string') === undefined),
    });

    await connection;
    const { content, title, keywords, author } = await parse;
    const sameTitleArticle = await prismaClient.article.findFirst({
      where: {
        title,
      },
    });
    if (sameTitleArticle) {
      throw new BadRequest('存在相同标题的文章，如果是有意为之，请使用修改文章功能');
    }
    const date = new Date();
    const article = await prismaClient.article.create({
      data: {
        content,
        date,
        title,
        keywords,
        author,
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
