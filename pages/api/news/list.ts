import type { NextApiHandler } from 'next';
import { Err, News, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { query, responsiveImageFragment } from '@/lib/cms';
const {
  parser: { strLengthGt, secondaryCheck },
} = parseParam;
const handler: NextApiHandler<News.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const dto = await parseParam<{
      page: string;
      size: string;
    }>(req.query, {
      page: secondaryCheck(strLengthGt(0), param => {
        return !isNaN(parseInt(param, 10));
      }),
      size: secondaryCheck(strLengthGt(0), param => {
        return !isNaN(parseInt(param, 10));
      }),
    });

    const page = parseInt(dto.page);
    const size = parseInt(dto.size);
    const { allNews: news } = await query<{ allNews: News.ListResp }>(
      `query QueryNewsList($skip: IntType, $take: IntType) {
      allNews(skip: $skip, first: $take, orderBy: createdAt_DESC) {
        id
        title
        brief
        createdAt
        cover {
          responsiveImage {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}`,
      {
        variables: {
          skip: page * size,
          take: size,
        },
      }
    );
    res.status(OK.code).json(news);
  } catch (err) {
    errorHandler(res)(err);
  }
};

export default handler;
