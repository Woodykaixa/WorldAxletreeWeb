import { useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Typography } from 'antd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { EditorStyle, upload, consumeMeta } from '@/components/editor';

const EditorPlugins = [gfm(), footnotes(), frontmatter(), upload(), consumeMeta()];

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
