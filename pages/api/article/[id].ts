import type { NextApiHandler } from 'next';
import { Article, Cl, Err, News, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { NotFound } from '@/lib/error';
import ObjectID from 'bson-objectid';

const {
  parser: { string, secondaryCheck },
} = parseParam;
const handler: NextApiHandler<Article.GetResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const connection = prismaClient.$connect();

    const { id } = await parseParam<Article.GetDTO>(req.query, {
      id: secondaryCheck(string, param => ObjectID.isValid(param)),
    });
    await connection;

    const article = await prismaClient.article.findFirst({
      where: {
        id,
      },
    });
    if (!article) {
      throw new NotFound();
    }
    res.status(OK.code).send(article);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
