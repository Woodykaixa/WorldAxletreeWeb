import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Editor, EditorProps } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import styled from 'styled-components';
import { Typography } from 'antd';
import type { BytemdPlugin } from 'bytemd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { UploadOutlined } from '@ant-design/icons';
import { renderToString } from 'react-dom/server';

const EditorStyleOverride = styled.div`
  & .bytemd {
    height: calc(100vh - 120px);
  }

  & .bytemd-fullscreen {
    top: 120px;
    height: calc(100vh - 120px) !important;
  }

  & .bytemd-toolbar-right [bytemd-tippy-path='5'] {
    display: none;
  }

  /* WTF? bytemd set vertical-align: top and help panel got overflow??? */
  & .bytemd-help ul div {
    vertical-align: baseline;
  }
`;

const plugins = [gfm(), footnotes(), frontmatter(), upload(), parseFrontmatter()];

export default function ArticleEditor() {
  const [value, setValue] = useState('');
  return (
    <div className='w-full'>
      <EditorStyleOverride>
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
      </EditorStyleOverride>
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
