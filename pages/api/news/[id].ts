import type { NextApiHandler } from 'next';
import { Cl, Err, News, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { NotFound } from '@/lib/error';
import { query, responsiveImageFragment } from '@/lib/cms';
const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<News.GetResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const { id } = await parseParam<News.GetDTO>(req.query, {
      id: strLengthGt(0),
    });

    const { news } = await query<{ news: News.GetResp | null }>(
      `query QueryNewsById($newsId: ItemId) {
      news(filter: {id: {eq: $newsId}}) {
        createdAt
        title
        brief
        id
        cover {
          responsiveImage {
            ...responsiveImageFragment
          }
        }
        content
      }
    }
    ${responsiveImageFragment}`,
      {
        variables: {
          newsId: id,
        },
      }
    );
    if (!news) {
      throw new NotFound();
    }
    res.status(OK.code).send(news);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
