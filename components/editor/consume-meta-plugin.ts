import type { BytemdPlugin } from 'bytemd';

export type ConsumeMetaPluginOptions = {
  onReceiveMeta: (meta: string | object) => void;
};

export function consumeMeta({ onReceiveMeta }: ConsumeMetaPluginOptions): BytemdPlugin {
  return {
    rehype: p =>
      p.use(() => (_, vfile) => {
        const { frontmatter } = vfile;
        if (frontmatter) {
          onReceiveMeta(frontmatter);
        }
      }),
  };
}
