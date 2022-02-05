import { Wiki, Article, Cl, News, Notice } from '@/dto';
export const UploadTypes = ['notice', 'news', 'article', 'wiki'] as const;
export type UploadType = typeof UploadTypes[number];

export type BasicMeta<T extends UploadType> = {
  type: T;
};

// type ChangelogMeta = BasicMeta<'changelog'> & {
//   /**
//    * Version string meta, format: {major}.{minor}.{patch}
//    */
//   version: string;
// };

export type NewsMeta = BasicMeta<'news'> & {
  /**
   * title of this news
   */
  title: string;

  /**
   * cover image url of this news
   */
  cover?: string;
};

export const WikiMetaTypes = [...Wiki.AllWikiTypes, 'B', 'S', 'U'] as const;
export const WikiMetaTypeMapping: Record<typeof WikiMetaTypes[number], Wiki.WikiType> = {
  B: 'Building',
  Building: 'Building',
  S: 'Support',
  Support: 'Support',
  U: 'Unit',
  Unit: 'Unit',
};

export const WikiMetaActions = ['new', 'update'] as const;

export type WikiMeta = BasicMeta<'wiki'> & {
  action?: typeof WikiMetaActions[number];
  kind: typeof WikiMetaTypes[number];
  order: number;
  side: Wiki.Side;
  title: string;
};

export type UploaderReturn = {
  article: Article.CreateResp;
  changelog: Cl.CreateResp;
  news: News.CreateResp;
  notice: Notice.CreateResp;
  wiki: Wiki.CreateResp;
};

export type UploaderMeta = {
  article: BasicMeta<'article'>;
  // changelog: ChangelogMeta;
  news: NewsMeta;
  notice: BasicMeta<'notice'>;
  wiki: WikiMeta;
};

export type UploaderMapping = {
  [type in UploadType]: (meta: UploaderMeta[type], content: string) => Promise<UploaderReturn[type]>;
};

export const LocalStorageWikiKey = 'wiki-update-id';
