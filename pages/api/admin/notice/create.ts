import type { NextApiHandler } from 'next';
import { Cl, Err, Notice, OK } from '@/dto';
import { parseParam, errorHandler } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import { greater } from '@/lib/game-ver';
import prismaClient from '@/lib/prisma';
import { pick } from 'lodash';
const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<Notice.CreateResp | Err.Resp> = async (req, res) => {
  try {
    const connection = prismaClient.$connect();

    const parse = parseParam<Notice.CreateDTO>(req.query, {
      content: strLengthGt(0),
    });

    await connection;
    const { content } = await parse;
    const date = new Date();
    const notice = await prismaClient.notice.create({
      data: {
        content,
        date,
      },
    });
    res.status(OK.code).json(notice);
  } catch (err) {
    errorHandler(res)(err);
  }
};

export default handler;
