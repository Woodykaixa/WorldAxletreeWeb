import type { BytemdPlugin } from 'bytemd';
import { renderToString } from 'react-dom/server';
import { UploadOutlined } from '@ant-design/icons';

export type UploadPluginOptions = {
  onUpload: (value: string) => void;
};
export function upload({ onUpload }: UploadPluginOptions): BytemdPlugin {
  return {
    actions: [
      {
        title: '上传文章',
        icon: renderToString(<UploadOutlined />),
        handler: {
          type: 'action',
          click: ctx => {
            const text = ctx.editor.getValue();
            onUpload(text);
          },
        },
      },
    ],
  };
}
