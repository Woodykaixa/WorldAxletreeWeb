import type { BytemdPlugin } from 'bytemd';

export function consumeMeta(): BytemdPlugin {
  return {
    rehype: p =>
      p.use(() => (tree, vfile) => {
        console.log('vfile', vfile);
      }),
  };
}
