export * from './auth';
export * from './changelog';
export * from './error';
export * from './news';
export * from './notice';
export * from './article';
export * from './wiki';

export namespace OK {
  export const code = 200 as const;
  export const text = 'ok' as const;
}
