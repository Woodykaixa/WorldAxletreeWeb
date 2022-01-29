import { Simplify } from '@/util/type';
import type { Image as Model } from '@prisma/client';

export namespace Image {
  export type CreateDTO = {
    filename: string;
    dataUrl: string;
  };
  export type CreateResp = Simplify<Omit<Model, 'content'> & { size: number }>;

  export type DeleteDTO = { name: string };
  export type DeleteResp = Model;

  export type DetailDTO = { name: string };
  export type DetailResp = Simplify<Omit<Model, 'content'> & { size: number }>;

  export type GetDTO = { name: string };
  export type GetResp = Buffer;

  export type ListDTO = { size: number; page: number };
  export type ListResp = { id: string; name: string }[];
}
