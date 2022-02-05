import type { NextApiHandler } from 'next';
import { Article, Err, OK, Wiki } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { NotFound } from '@/lib/error';
import prismaClient from '@/lib/prisma';
const {
  parser: { string },
} = parseParam;
const handler: NextApiHandler<Article.GetByTitleResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const connection = prismaClient.$connect();

    const { title } = await parseParam<Article.GetByTitleDTO>(req.query, {
      title: string,
    });

    await connection;

    const article = await prismaClient.article.findFirst({
      where: {
        title,
      },
    });
    if (!article) {
      throw new NotFound(`不存在标题为: ${title} 的文章`);
    }
    res.status(OK.code).json(article);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
