import { Cl, Err, News, Notice, OK, PlayerArticle, Wiki } from '@/dto';
import { makeError } from './error';

const UploadTypes = ['notice', 'changelog', 'news', 'article', 'wiki'] as const;
type UploadType = typeof UploadTypes[number];

const Validator: Record<UploadType, (meta: any) => void | Promise<void>> = {
  article: meta => {
    throw new Error('目前尚未支持上传 article');
  },
  changelog: (meta: ChangelogMeta) => {
    if (!meta.version) {
      throw new MissingFieldError(['version']);
    }
    if (typeof meta.version !== 'string') {
      throw new FieldTypeError('version', ['字符串, 且格式为: 主版本号.副版本号.补丁版本号']);
    }
    if (!/^(\d+)\.(\d+)\.(\d+)$/.test(meta.version)) {
      throw new FieldFormatError('version', ['主版本号.副版本号.补丁版本号']);
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
  /**
   * Version string meta, format: {major}.{minor}.{patch}
   */
  version: string;
};

type UploaderReturn = {
  article: PlayerArticle.CreateResp;
  changelog: Cl.CreateResp;
  news: News.CreateResp;
  notice: Notice.CreateResp;
  wiki: Wiki.CreateResp;
};

type UploaderMeta = {
  article: BasicMeta;
  changelog: ChangelogMeta;
  news: BasicMeta;
  notice: BasicMeta;
  wiki: BasicMeta;
};

type UploaderMapping = {
  [type in UploadType]: (meta: UploaderMeta[type], content: string) => Promise<UploaderReturn[type]>;
};

const upload = async <T>(dto: any, action: string): Promise<T> => {
  const response = await fetch(action, {
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
  return JSON.parse(data) as T;
};

const Uploader: Partial<UploaderMapping> = {
  changelog: async (meta, content) => {
    const [major, minor, patch] = meta.version.split('.').map(v => parseInt(v, 10));
    const dto: Cl.CreateDTO = {
      majorVersion: major,
      minorVersion: minor,
      patchVersion: patch,
      content,
    };
    return upload(dto, '/api/changelog/admin/create');
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
  const result = await uploader(meta as any, content);
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

class FieldFormatError extends MetaError {
  constructor(field: string, format: string[]) {
    super(`元数据 ${field} 字段格式错误`, '应为以下格式: ' + format.join(' | '));
  }
}
