import type { NextApiHandler } from 'next';
import { Err, OK, Wiki } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { NotFound } from '@/lib/error';
import prismaClient from '@/lib/prisma';
const {
  parser: { string },
} = parseParam;
const handler: NextApiHandler<Wiki.GetByTitleResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const connection = prismaClient.$connect();

    const { title } = await parseParam<Wiki.GetByTitleDTO>(req.query, {
      title: string,
    });

    await connection;

    const wiki = await prismaClient.wiki.findFirst({
      where: {
        title,
      },
    });
    if (!wiki) {
      throw new NotFound(`不存在标题为: ${title} 的 Wiki`);
    }
    res.status(OK.code).json(wiki);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
