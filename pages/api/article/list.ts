import type { NextApiHandler } from 'next';
import { Wiki, Err, OK, Article } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { createBrief } from '@/util/brief';
const {
  parser: { secondaryCheck, string },
} = parseParam;
const handler: NextApiHandler<Article.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);
    const connection = prismaClient.$connect();

    const dto = await parseParam<{
      [key in keyof Article.ListDTO]: string;
    }>(req.query, {
      size: secondaryCheck(string, param => !isNaN(parseInt(param, 10))),
      page: secondaryCheck(string, param => !isNaN(parseInt(param, 10))),
    });

    const size = parseInt(dto.size, 10);
    const page = parseInt(dto.page, 10);

    await connection;

    const articles = await prismaClient.article.findMany({
      take: size,
      skip: page * size,
      orderBy: {
        date: 'desc',
      },
    });
    res.status(OK.code).json(
      articles.map(a => {
        const { content, ...rest } = a;
        return {
          ...rest,
          brief: createBrief(content),
        };
      })
    );
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
