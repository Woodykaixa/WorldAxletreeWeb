import type { Simplify } from '@/util/type';
import type { Article as Model } from '@prisma/client';
import { ResponsiveImageType } from 'react-datocms';
export namespace Article {
  export type Item = {
    keywords: string[];
    updatedAt: string;
    id: string;
    title: string;
    content: string;
    brief: null | string;
    author: string;
    seoMeta: null | {
      description: string;
      title: string;
      image: null | {
        responsiveImage: ResponsiveImageType;
      };
      twitterCard: string;
    };
  };
  export type CreateDTO = Simplify<Omit<Model, 'id' | 'date'>>;
  export type CreateResp = Model;

  export type DeleteDTO = { id: string };
  export type DeleteResp = Model;

  export type GetDTO = { id: string };
  export type GetResp = Omit<Item, 'brief'>;

  export type GetByTitleDTO = { title: string };
  export type GetByTitleResp = Model;

  export type ListDTO = { size: number; page: number };
  export type ListResp = ListItem[];
  type ListItem = Omit<Item, 'seoMeta' | 'content'>;
  export type UpdateDTO = Simplify<Omit<Model, 'id' | 'date'> & { id: string }>;
  export type UpdateResp = Model;
}
