import type { Simplify } from '@/util/type';
import type { News as Model } from '@prisma/client';
import { ResponsiveImageType } from 'react-datocms';
export namespace News {
  export type Item = {
    id: string;
    title: string;
    brief: string | null;
    createdAt: string;
    content: string;
    cover: {
      responsiveImage: ResponsiveImageType;
    } | null;
  };
  export type CreateDTO = Simplify<Omit<Model, 'id' | 'brief' | 'date'>>;
  export type CreateResp = Model;

  export type DeleteDTO = { id: string };
  export type DeleteResp = Model;

  export type GetDTO = { id: string };
  export type GetResp = Item;

  export type ListDTO = { size: number; page: number };
  export type ListResp = ListItem[];
  type ListItem = Simplify<Omit<Item, 'content'>>;

  export type UpdateDTO = Simplify<Partial<Omit<Model, 'id'>> & { id: string }>;
  export type UpdateResp = Model;
}
