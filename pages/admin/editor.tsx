import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import styled from 'styled-components';
import { Typography } from 'antd';
import { useRouter } from 'next/router';

const EditorStyleOverride = styled.div`
  & .bytemd {
    height: calc(100vh - 120px);
  }

  & .bytemd-fullscreen {
    top: 120px;
    height: calc(100vh - 120px) !important;
  }
`;
const plugins = [gfm(), footnotes()];

export default function ArticleEditor() {
  const [value, setValue] = useState('');
  return (
    <div className='w-full'>
      <EditorStyleOverride>
        <Typography>
          <Editor
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
