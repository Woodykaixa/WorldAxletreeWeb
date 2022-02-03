import type { NextApiHandler } from 'next';
import { Cl, Err, Notice, OK, Wiki } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import { greater } from '@/lib/game-ver';
import prismaClient from '@/lib/prisma';
import { pick } from 'lodash';
const {
  parser: { secondaryCheck, string },
} = parseParam;
const handler: NextApiHandler<Wiki.CreateResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['POST']);

    const connection = prismaClient.$connect();

    const parse = parseParam<Wiki.CreateDTO>(req.body, {
      side: secondaryCheck<string, Wiki.Side>(string, param => {
        return Wiki.AllSides.includes(param as any);
      }),
      content: string,
      title: string,
      type: secondaryCheck<string, Wiki.WikiType>(string, param => Wiki.AllWikiTypes.includes(param as any)),
    });

    await connection;
    const { content, side, title, type } = await parse;
    const sameTitleWiki = await prismaClient.wikiArticle.findFirst({
      where: {
        title,
      },
    });
    if (sameTitleWiki) {
      throw new BadRequest('存在相同标题的 Wiki，如果是有意为之，请使用修改 Wiki 功能');
    }
    const date = new Date();
    const wiki = await prismaClient.wikiArticle.create({
      data: {
        content,
        side,
        type,
        date,
        title,
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
