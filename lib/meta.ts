import { Cl, News, Notice, OK, PlayerArticle, Wiki } from '@/dto';
import { makeError } from './error';

const UploadTypes = ['notice', 'changelog', 'news', 'article', 'wiki'] as const;
type UploadType = typeof UploadTypes[number];

const Validator: Record<UploadType, (meta: any) => void | Promise<void>> = {
  article: meta => {
    throw new Error('目前尚未支持上传 article');
  },
  changelog: (meta: ChangelogMeta) => {
    if (!meta.major || typeof meta.major !== 'number') {
      throw new Error('目前尚未支持上传 changelog');
    }
  },
  news: meta => {
    throw new Error('目前尚未支持上传 news');
  },
  notice: meta => {},
  wiki: meta => {
    throw new Error('目前尚未支持上传 wiki');
  },
};

type BasicMeta = {
  type: UploadType;
};

type ChangelogMeta = BasicMeta & {
  major: number;
  minor: number;
  patch: number;
};

type UploaderReturn = {
  article: PlayerArticle.CreateResp;
  changelog: Cl.CreateResp;
  news: News.CreateResp;
  notice: Notice.CreateResp;
  wiki: Wiki.CreateResp;
};

type UploaderMapping = {
  [type in UploadType]: (meta: any, content: string) => Promise<UploaderReturn[type]>;
};

const Uploader: Partial<UploaderMapping> = {
  news: meta => {
    throw new Error('目前尚未支持上传 news');
  },
  notice: async (_, content) => {
    const dto: Notice.CreateDTO = {
      content,
    };
    const response = await fetch('/api/notice/admin/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dto),
    });

    const data = await response.text();
    if (response.status !== OK.code) {
      const error = JSON.parse(data);
      throw makeError(error);
    }
    return JSON.parse(data) as Wiki.CreateResp;
  },
};

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
  const validate = Validator[meta.type as UploadType];
  await validate(meta);
  const uploader = Uploader[meta.type as UploadType]!;
  const result = await uploader(meta, content);
  return result;
}

class MetaError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

class MissingFieldError extends MetaError {
  constructor(field: string[]) {
    super('元数据缺少字段', field.join(', '));
  }
}

class FieldTypeError extends MetaError {
  constructor(field: string, expect: string[]) {
    super(`元数据 ${field} 字段类型错误`, '应声明以下类型: ' + expect.join(' | '));
  }
}
