import type { Simplify } from '@/util/type';
import type { Changelog as Model } from '@prisma/client';
import type { StructuredTextGraphQlResponse, ResponsiveImageType } from 'react-datocms';

export namespace Cl {
  export type Item = {
    id: string;
    title: string;
    updatedAt: string;
    cover: {
      responsiveImage: ResponsiveImageType;
    } | null;
    content: StructuredTextGraphQlResponse;
  };
  export type CreateDTO = Simplify<Omit<Model, 'id' | 'date'>>;
  export type CreateResp = Model;

  export type DeleteDTO = { id: string };
  export type DeleteResp = Model;

  export type GetDTO = { id: string };
  export type GetResp = Model;

  export type ListDTO = { size: number; page: number };
  export type ListResp = Item[];

  export type UpdateDTO = Simplify<Partial<Omit<Model, 'id' | 'date'>> & { id: string }>;
  export type UpdateResp = Model;
}
