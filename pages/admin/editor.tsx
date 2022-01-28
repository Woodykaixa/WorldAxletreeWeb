import { useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Typography } from 'antd';
import type { BytemdPlugin } from 'bytemd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { UploadOutlined } from '@ant-design/icons';
import { renderToString } from 'react-dom/server';
import { EditorStyle } from '@/components/EditorStyle';

const plugins = [gfm(), footnotes(), frontmatter(), upload(), parseFrontmatter()];

export default function ArticleEditor() {
  const [value, setValue] = useState('');
  return (
    <div className='w-full'>
      <EditorStyle>
        <Typography>
          <Editor
            locale={zhHans}
            editorConfig={{
              lineNumbers: true,
              cursorScrollMargin: 100,
            }}
            value={value}
            plugins={plugins}
            onChange={v => {
              setValue(v);
            }}
          />
        </Typography>
      </EditorStyle>
    </div>
  );
}

function upload(): BytemdPlugin {
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

function parseFrontmatter(): BytemdPlugin {
  return {
    rehype: p =>
      p.use(() => (tree, vfile) => {
        console.log('vfile', vfile);
      }),
  };
}
