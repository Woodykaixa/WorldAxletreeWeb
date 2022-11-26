import type { Simplify } from '@/util/type';
import type { Notice as Model } from '@prisma/client';
import type { StructuredTextGraphQlResponse } from 'react-datocms';
export namespace Notice {
  export type Item = {
    id: string;
    content: StructuredTextGraphQlResponse;
    updatedAt: string;
  };
  export type CreateDTO = Simplify<Omit<Model, 'id' | 'date'>>;
  export type CreateResp = Model;

  export type DeleteDTO = { id: string };
  export type DeleteResp = Model;

  export type GetDTO = { id: string };
  export type GetResp = Model;

  export type ListDTO = { size: number; page: number };
  export type ListResp = Item[];

  export type UpdateDTO = Simplify<Partial<Omit<Model, 'id'>> & { id: string }>;
  export type UpdateResp = Model;
}
