import { useMemo, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import { message, Typography } from 'antd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { EditorStyle, upload, consumeMeta } from '@/components/editor';

let meta: {
  value: object | null | string;
} = {
  value: null,
};

export default function ArticleEditor() {
  const [value, setValue] = useState('');
  const EditorPlugins = useMemo(
    () => [
      gfm(),
      footnotes(),
      frontmatter(),
      upload({
        onUpload(text) {
          console.log('meta', meta.value);
          console.log('on upload:', text);
          return Promise.resolve();
        },
      }),
      consumeMeta({
        onReceiveMeta(m) {
          meta.value = m;
        },
      }),
    ],
    []
  );
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
            plugins={EditorPlugins}
            onChange={v => {
              setValue(v);
            }}
          />
        </Typography>
      </EditorStyle>
    </div>
  );
}
