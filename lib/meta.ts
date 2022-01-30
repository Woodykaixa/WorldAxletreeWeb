import { Cl, Err, News, Notice, OK, PlayerArticle, Wiki } from '@/dto';
import { makeError } from './error';

const UploadTypes = ['notice', 'news', 'article', 'wiki'] as const;
type UploadType = typeof UploadTypes[number];

const Validator: Record<UploadType, (meta: any) => void | Promise<void>> = {
  article: meta => {
    throw new Error('目前尚未支持上传 article');
  },
  // changelog: (meta: ChangelogMeta) => {
  //   if (!meta.version) {
  //     throw new MissingFieldError(['version']);
  //   }
  //   if (typeof meta.version !== 'string') {
  //     throw new FieldTypeError('version', ['字符串, 且格式为: 主版本号.副版本号.补丁版本号']);
  //   }
  //   if (!/^(\d+)\.(\d+)\.(\d+)$/.test(meta.version)) {
  //     throw new FieldFormatError('version', ['主版本号.副版本号.补丁版本号']);
  //   }
  // },
  news: (meta: NewsMeta) => {
    if (!meta.title) {
      throw new MissingFieldError(['title']);
    }
    if (typeof meta.title !== 'string') {
      throw new FieldTypeError('title', ['字符串']);
    }
    if (meta.cover && typeof meta.cover !== 'string') {
      throw new FieldTypeError('cover', ['图片链接']);
    }
    if (meta.cover && !meta.cover.startsWith('http')) {
      throw new FieldTypeError('cover', ['图片链接 (http或https)']);
    }
  },
  notice: meta => {},
  wiki: meta => {
    throw new Error('目前尚未支持上传 wiki');
  },
};

type BasicMeta<T extends UploadType> = {
  type: T;
};

// type ChangelogMeta = BasicMeta<'changelog'> & {
//   /**
//    * Version string meta, format: {major}.{minor}.{patch}
//    */
//   version: string;
// };

type NewsMeta = BasicMeta<'news'> & {
  /**
   * title of this news
   */
  title: string;

  /**
   * cover image url of this news
   */
  cover?: string;
};

type UploaderReturn = {
  article: PlayerArticle.CreateResp;
  changelog: Cl.CreateResp;
  news: News.CreateResp;
  notice: Notice.CreateResp;
  wiki: Wiki.CreateResp;
};

type UploaderMeta = {
  article: BasicMeta<'article'>;
  // changelog: ChangelogMeta;
  news: NewsMeta;
  notice: BasicMeta<'notice'>;
  wiki: BasicMeta<'wiki'>;
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
  // changelog: async (meta, content) => {
  //   const [major, minor, patch] = meta.version.split('.').map(v => parseInt(v, 10));
  //   const dto: Cl.CreateDTO = {
  //     majorVersion: major,
  //     minorVersion: minor,
  //     patchVersion: patch,
  //     content,
  //   };
  //   return upload(dto, '/api/changelog/admin/create');
  // },
  notice: async (_, content) => {
    const dto: Notice.CreateDTO = {
      content,
    };
    return upload(dto, '/api/notice/admin/create');
  },
  news: async (meta, content) => {
    const dto: News.CreateDTO = {
      content,
      title: meta.title,
      coverUrl: meta.cover ?? null,
    };
    return upload(dto, '/api/news/admin/create');
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
  const validate = Validator[meta.type];
  await validate(meta);
  const uploader = Uploader[meta.type]!;
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
