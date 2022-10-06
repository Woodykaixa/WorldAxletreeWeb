import { useEffect, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gfmZh from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json';
import footnotes from '@bytemd/plugin-footnotes';
import { Modal, Typography } from 'antd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { EditorStyle, modal } from '@/components/editor';
import { BytemdPlugin } from 'bytemd';
import { FileImageOutlined } from '@ant-design/icons';
import { renderToString } from 'react-dom/server';
import { ImageWall } from '@/components';
import { LocalStorageArticleKey, LocalStorageWikiKey } from '@/lib/meta/type';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

type EditorProps = Props | {};

export function MarkdownEditor(props: EditorProps) {
  const { value, onChange } = props as Props;
  const { visible: imageWallVisible, open: openImageWall, close: closeImageWall } = useModal();

  useClearId();

  const [editorPlugins, setPlugin] = useState<BytemdPlugin[]>([]);
  useEffect(() => {
    setPlugin([
      gfm({
        locale: gfmZh,
      }),
      footnotes(),
      modal({
        openModal: openImageWall,
        iconString: renderToString(<FileImageOutlined />),
        title: '打开图片库',
      }),
    ]);
  }, []);

  return (
    <>
      <Modal visible={imageWallVisible} onCancel={closeImageWall} mask footer={null} className='w-3/4-screen' centered>
        <ImageWall className='max-h-[60vh]'></ImageWall>
      </Modal>
      <div className='w-full'>
        <EditorStyle>
          <Typography>
            <Editor
              value={value}
              onChange={onChange}
              locale={zhHans}
              editorConfig={{
                lineNumbers: true,
                cursorScrollMargin: 100,
              }}
              plugins={editorPlugins}
            />
          </Typography>
        </EditorStyle>
      </div>
    </>
  );
}

function useModal() {
  const [visible, setVisible] = useState(false);
  return {
    visible,
    open: () => setVisible(true),
    close: () => setVisible(false),
  };
}

function useClearId() {
  useEffect(() => {
    localStorage.removeItem(LocalStorageArticleKey);
    localStorage.removeItem(LocalStorageWikiKey);
  }, []);
}
