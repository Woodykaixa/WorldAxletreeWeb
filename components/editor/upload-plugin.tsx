import type { BytemdPlugin } from 'bytemd';
import { renderToString } from 'react-dom/server';
import { UploadOutlined } from '@ant-design/icons';

export function upload(): BytemdPlugin {
  return {
    actions: [
      {
        title: '上传文章',
        icon: renderToString(<UploadOutlined />),
        handler: {
          type: 'action',
          click: ctx => {
            const text = ctx.editor.getValue();

            console.log('text', text);
          },
        },
      },
    ],
  };
}
