import { Cl, Err, News, Notice, OK, PlayerArticle, Wiki } from '@/dto';
import { makeError } from '../error';
import { MetaError, MissingFieldError, FieldFormatError, FieldTypeError } from './meta-error';
import { UploadType, UploadTypes, UploaderMapping, UploaderReturn } from './type';
import { Validator } from './validator';
import { Uploader } from './uploader';

/**
 * validate meta data, if valid, upload `content`
 */
export async function validateAndUpload(
  meta: { type: UploadType },
  content: string
): Promise<UploaderReturn[typeof meta['type']]> {
  if (!meta.type) {
    throw new MissingFieldError(['type']);
  }
  if (!UploadTypes.includes(meta.type)) {
    throw new FieldTypeError('type', UploadTypes as unknown as string[]);
  }
  const validate = Validator[meta.type];
  await validate(meta);
  const uploader = Uploader[meta.type]!;
  const result = await uploader(meta as any, content);
  return result;
}
