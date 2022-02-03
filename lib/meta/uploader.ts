import { UploaderMapping, WikiMetaTypeMapping } from './type';
import { Notice, Wiki, PlayerArticle, News, OK } from '@/dto';
import { makeError } from '../error';
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

export const Uploader: UploaderMapping = {
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
  wiki: async (meta, content) => {
    const type = WikiMetaTypeMapping[meta.kind];
    if (meta.action === 'update') {
      const dto: Wiki.UpdateDTO = {
        id: localStorage.getItem('wiki-update-id') ?? '',
        side: meta.side,
        title: meta.title,
        type,
        content,
      };
      return upload<Wiki.UpdateResp>(dto, '/api/wiki/admin/update');
    }
    const dto: Wiki.CreateDTO = {
      side: meta.side,
      title: meta.title,
      type,
      content,
    };
    return upload(dto, '/api/wiki/admin/create');
  },
  article: () => {
    throw new Error('Not Implemented');
  },
};
