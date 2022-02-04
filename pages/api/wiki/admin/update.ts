import type { NextApiHandler } from 'next';
import { Cl, Err, Notice, OK, Wiki } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { BadRequest, NotFound } from '@/lib/error';
import { greater } from '@/lib/game-ver';
import prismaClient from '@/lib/prisma';
import { pick } from 'lodash';
import objectId from 'bson-objectid';
const {
  parser: { secondaryCheck, string, int },
} = parseParam;
const handler: NextApiHandler<Wiki.UpdateResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['POST']);

    const connection = prismaClient.$connect();

    const parse = parseParam<Wiki.UpdateDTO>(req.body, {
      id: secondaryCheck(string, param => objectId.isValid(param)),
      side: secondaryCheck<string, Wiki.Side>(string, param => {
        return Wiki.AllSides.includes(param as any);
      }),
      content: string,
      title: string,
      type: secondaryCheck<string, Wiki.WikiType>(string, param => Wiki.AllWikiTypes.includes(param as any)),
      order: int,
    });

    await connection;
    const { content, side, title, type, id, order } = await parse;
    {
      const wiki = await prismaClient.wikiArticle.findFirst({
        where: {
          id,
        },
      });
      if (!wiki) {
        throw new NotFound('不存在该 Wiki，如果是有意为之，请使用创建 Wiki 功能');
      }
    }
    const date = new Date();

    const wiki = await prismaClient.wikiArticle.update({
      where: {
        id,
      },
      data: {
        content,
        side,
        type,
        date,
        title,
        order,
      },
    });
    res.status(OK.code).json(wiki);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
