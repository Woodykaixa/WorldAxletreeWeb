import type { NextApiHandler } from 'next';
import { Wiki, Err, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
const {
  parser: { intGe, intGt, strLengthGt, secondaryCheck, string },
} = parseParam;
const handler: NextApiHandler<Wiki.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);
    const connection = prismaClient.$connect();

    const { side, type } = await parseParam<Wiki.ListDTO>(req.query, {
      side: secondaryCheck(string, param => Wiki.AllSides.includes(param as Wiki.Side)),
      type: secondaryCheck(string, param => Wiki.AllWikiTypes.includes(param as Wiki.WikiType)),
    });

    await connection;

    const wiki = await prismaClient.wikiArticle.findMany({
      where: {
        side,
        type,
      },
      orderBy: {
        order: 'asc',
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
