import type { NextApiHandler } from 'next';
import { Err, OK } from '@/dto';
import { parseParam, errorHandler, ensureMethod } from '@/lib/api';
import { BadRequest } from '@/lib/error';
import prismaClient from '@/lib/prisma';
import imageSize from 'image-size';
import { ensureAuth } from '@/lib/jwt';

import { Image } from '@/dto/image';
const {
  parser: { strLengthGt, secondaryCheck },
} = parseParam;
const handler: NextApiHandler<Image.CreateResp | Err.Resp> = async (req, res) => {
  try {
    await ensureAuth(req);
    await ensureMethod(req.method, ['POST']);

    const connection = prismaClient.$connect();

    const { filename, dataUrl } = await parseParam<Image.CreateDTO>(req.body, {
      filename: strLengthGt(0),
      dataUrl: secondaryCheck(strLengthGt(0), url => url.startsWith('data:image')),
    });
    await connection;
    const [meta, contentStr] = dataUrl.split(',');
    const mimeReg = /data:(image\/.+);base64/.exec(meta);
    if (!mimeReg) {
      throw new BadRequest('content is not image');
    }
    const mimeType = mimeReg[1];
    const content = Buffer.from(contentStr, 'base64');
    const dim = imageSize(content);
    if (dim.height === undefined || dim.width === undefined) {
      throw new BadRequest('cannot read image size');
    }
    console.log(mimeType, content.length, dim);
    const image = await prismaClient.image.create({
      data: {
        name: filename,
        content,
        width: dim.width,
        height: dim.height,
        encoding: mimeType,
      },
    });
    res.status(OK.code).json({
      id: image.id,
      name: image.name,
      width: image.width,
      height: image.height,
      encoding: image.encoding,
      size: content.length,
    });
  } catch (err) {
    errorHandler(res)(err);
  } finally {
    await prismaClient.$disconnect();
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};
