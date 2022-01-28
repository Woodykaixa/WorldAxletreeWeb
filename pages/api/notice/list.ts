import type { NextApiHandler } from 'next';
import { Cl, Err, Notice, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import { greater } from '@/lib/game-ver';
import prismaClient from '@/lib/prisma';
import { pick } from 'lodash';
const {
  parser: { intGe, intGt },
} = parseParam;
const handler: NextApiHandler<Notice.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);
    const connection = prismaClient.$connect();

    const parse = parseParam<Notice.ListDTO>(req.query, {
      page: intGe(0),
      size: intGt(0),
    });

    await connection;
    const { page, size } = await parse;
    const notices = await prismaClient.notice.findMany({
      take: size,
      skip: size * page,
      orderBy: {
        date: 'desc',
      },
    });
    res.status(OK.code).json(notices);
  } catch (err) {
    errorHandler(res)(err);
  }
};

export default handler;
