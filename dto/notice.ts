import type { Simplify } from '@/util/type';
import type { Notice as Model } from '@prisma/client';
export namespace Notice {
  export type CreateDTO = Simplify<Omit<Model, 'id'>>;
  export type CreateResp = Model;

  export type DeleteDTO = { id: string };
  export type DeleteResp = Model;

  export type GetDTO = { id: string };
  export type GetResp = Model;

  export type ListDTO = { size: number; page: number };
  export type ListResp = Model[];

  export type UpdateDTO = Simplify<Partial<Omit<Model, 'id'>> & { id: string }>;
  export type UpdateResp = Model;
}
