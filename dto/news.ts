import type { Simplify } from '@/util/type';
import type { News as Model } from '@prisma/client';
export namespace News {
  export type CreateDTO = Simplify<Omit<Model, 'id' | 'brief' | 'date'>>;
  export type CreateResp = Model;

  export type DeleteDTO = { id: string };
  export type DeleteResp = Model;

  export type GetDTO = { id: string };
  export type GetResp = Model;

  export type ListDTO = { size: number; page: number };
  export type ListResp = ListItem[];
  type ListItem = Simplify<Omit<Model, 'content'> & { brief: string }>;

  export type UpdateDTO = Simplify<Partial<Omit<Model, 'id'>> & { id: string }>;
  export type UpdateResp = Model;
}
