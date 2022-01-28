import type { NextApiHandler } from 'next';
import { Cl, Err, OK } from '@/dto';
import { parseParam, errorHandler } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import { greater } from '@/lib/game-ver';
import prismaClient from '@/lib/prisma';
import { pick } from 'lodash';
const {
  parser: { strLengthGt, int },
} = parseParam;
const handler: NextApiHandler<Cl.CreateResp | Err.Resp> = async (req, res) => {
  try {
    const connection = prismaClient.$connect();

    const parse = parseParam<Cl.CreateDTO>(req.query, {
      content: strLengthGt(0),
      majorVersion: int,
      minorVersion: int,
      patchVersion: int,
    });

    await connection;
    const dto = await parse;
    const latest = await prismaClient.changelog.findFirst({
      orderBy: {
        date: 'desc',
      },
    });

    if (latest) {
      const latestVersion = pick(latest, ['majorVersion', 'minorVersion', 'patchVersion']);
      const createVersion = pick(dto, ['majorVersion', 'minorVersion', 'patchVersion']);
      if (!greater(createVersion, latestVersion)) {
        throw new BadRequest(
          `your changelog version (${dto.majorVersion}, ${dto.minorVersion}, ${dto.patchVersion}) is less than or equal to latest version`
        );
      }
    }

    const now = new Date();
    const cl = await prismaClient.changelog.create({
      data: {
        ...dto,
        date: now,
      },
    });
    res.status(OK.code).json(cl);
  } catch (err) {
    errorHandler(res)(err);
  }
};

export default handler;
