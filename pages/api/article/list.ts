import type { NextApiHandler } from 'next';
import { Err, OK, Article } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { query } from '@/lib/cms';
const {
  parser: { secondaryCheck, string },
} = parseParam;
const handler: NextApiHandler<Article.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const dto = await parseParam<{
      [key in keyof Article.ListDTO]: string;
    }>(req.query, {
      size: secondaryCheck(string, param => !isNaN(parseInt(param, 10))),
      page: secondaryCheck(string, param => !isNaN(parseInt(param, 10))),
    });

    const size = parseInt(dto.size, 10);
    const page = parseInt(dto.page, 10);

    const data = await query<{ allArticles: Article.ListResp }>(
      `query Query($skip: IntType, $first: IntType) {
      allArticles(skip: $skip, first: $first, orderBy: updatedAt_DESC) {
        keywords
        updatedAt
        id
        title
        brief
        author
      }
    }`,
      {
        variables: {
          skip: page * size,
          first: size,
        },
      }
    );

    res.status(OK.code).json(data.allArticles);
  } catch (err) {
    errorHandler(res)(err);
  }
};

export default handler;
