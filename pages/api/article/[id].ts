import type { NextApiHandler } from 'next';
import { Article, Cl, Err, News, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { NotFound } from '@/lib/error';
import { query, responsiveImageFragment } from '@/lib/cms';

const {
  parser: { string },
} = parseParam;
const handler: NextApiHandler<Article.GetResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const { id } = await parseParam<Article.GetDTO>(req.query, {
      id: string,
    });

    const { article } = await query<{
      article: Article.GetResp | null;
    }>(
      `query QueryArticleById($articleId: ItemId) {
      article(filter: {id: {eq: $articleId}}) {
        author
        content
        id
        keywords
        seoMeta {
          description
          title
          twitterCard
          image {
            responsiveImage {
              ...responsiveImageFragment
            }
          }
        }
        title
        updatedAt
      }
    }
    ${responsiveImageFragment}
    `,
      {
        variables: {
          articleId: id,
        },
      }
    );
    if (!article) {
      throw new NotFound();
    }
    res.status(OK.code).send(article);
  } catch (err) {
    errorHandler(res)(err);
  }
};

export default handler;
