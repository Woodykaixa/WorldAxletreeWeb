import type { Simplify } from '@/util/type';
import type { WikiArticle as Model, Side as ModelType } from '@prisma/client';
export namespace Wiki {
  export type CreateDTO = Simplify<Omit<Model, 'id' | 'date'>>;
  export type CreateResp = Model;

  export type DeleteDTO = { id: string };
  export type DeleteResp = Model;

  export type GetDTO = { id: string };
  export type GetResp = Model;

  export type ListDTO = { size: number; page: number };
  export type ListResp = ListItem[];
  type ListItem = Simplify<Omit<Model, 'content'> & { brief: string }>;

  export type UpdateDTO = Simplify<Partial<Omit<Model, 'id' | 'date'>> & { id: string }>;
  export type UpdateResp = Model;

  export type Side = ModelType;
  export const AllSides: Side[] = ['CISUF', 'EFRRF', 'FECO', 'NACSF', 'RITC'];
}