export * from './auth';
export * from './error';
export * from './news';
export * from './changelog';

export namespace OK {
  export const code = 200 as const;
  export const text = 'ok' as const;
}
