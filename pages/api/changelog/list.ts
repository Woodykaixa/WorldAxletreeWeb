import type { NextApiHandler } from 'next';
import { Cl, Err, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import prismaClient from '@/lib/prisma';
import { query, responsiveImageFragment } from '@/lib/cms';
const {
  parser: { strLengthGt, secondaryCheck },
} = parseParam;
const handler: NextApiHandler<Cl.ListResp | Err.Resp> = async (req, res) => {
  try {
    await ensureMethod(req.method, ['GET']);

    const dto = await parseParam<{
      page: string;
      size: string;
    }>(req.query, {
      page: secondaryCheck(strLengthGt(0), param => {
        return !isNaN(parseInt(param, 10));
      }),
      size: secondaryCheck(strLengthGt(0), param => {
        return !isNaN(parseInt(param, 10));
      }),
    });

    const page = parseInt(dto.page);
    const size = parseInt(dto.size);
    const { changelogs } = await query<{ changelogs: Cl.ListResp }>(
      `query ListChangelog($skip: IntType, $take: IntType) {
      changelogs: allChangelogs(skip: $skip, first: $take, orderBy: updatedAt_DESC) {
        id
        title
        updatedAt
        content {
          value
        }
        cover {
          responsiveImage(imgixParams: {maxH: "250", maxW: "250"}) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
    `,
      {
        variables: {
          skip: page * size,
          take: size,
        },
      }
    );
    res.status(OK.code).json(changelogs);
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;
