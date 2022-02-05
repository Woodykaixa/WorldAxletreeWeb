import type { NextApiHandler } from 'next';
import { Err, OK, Wiki } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import prismaClient from '@/lib/prisma';

const {
  parser: { secondaryCheck, string, int },
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
      order: int,
    });

    await connection;
    const { content, side, title, type, order } = await parse;
    const sameTitleWiki = await prismaClient.wiki.findFirst({
      where: {
        title,
      },
    });
    if (sameTitleWiki) {
      throw new BadRequest('存在相同标题的 Wiki，如果是有意为之，请使用修改 Wiki 功能');
    }
    const date = new Date();
    const wiki = await prismaClient.wiki.create({
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
