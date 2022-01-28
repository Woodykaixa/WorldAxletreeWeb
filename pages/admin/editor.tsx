import { useEffect, useMemo, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import { notification, Typography } from 'antd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { EditorStyle, upload, consumeMeta } from '@/components/editor';
import { validateAndUpload } from '@/lib/meta';
import { BytemdPlugin } from 'bytemd';

let meta: {
  value: object | null | string;
} = {
  value: null,
};
const onUpload = (text: string) => {
  if (!meta.value) {
    notification.error({
      message: '未填写元数据',
      description: '我们使用 frontmatter 语法编写的元数据来识别上传的文章内容',
    });
    return;
  }
  if (typeof meta.value === 'string') {
    notification.error({
      message: '元数据应该为对象而不是字符串',
      description: '请参考 yaml 语法，编写对象类型的元数据',
    });
    return;
  }
  validateAndUpload(meta.value as any, text)
    .then(res => {
      notification.success({
        message: '上传成功',
      });
      console.log('meta', meta.value);
      console.log('api return', res);
    })
    .catch(err => {
      const error = err as Error;
      notification.error({
        message: error.name,
        description: error.message,
      });
      console.error(error);
    });
};
export default function ArticleEditor() {
  const [value, setValue] = useState('');
  const [editorPlugins, setPlugin] = useState<BytemdPlugin[]>([]);
  useEffect(() => {
    setPlugin([
      gfm(),
      footnotes(),
      frontmatter(),
      upload({
        onUpload,
      }),
      consumeMeta({
        onReceiveMeta(m) {
          meta.value = m;
        },
      }),
    ]);
  }, []);
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
            plugins={editorPlugins}
            onChange={v => {
              setValue(v);
            }}
          />
        </Typography>
      </EditorStyle>
    </div>
  );
}
