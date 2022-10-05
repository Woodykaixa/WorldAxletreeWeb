import { useEffect, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gfmZh from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Button, Form, Input, message, Modal, notification, Select, Spin, Typography } from 'antd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { EditorStyle, upload, consumeMeta, modal } from '@/components/editor';
import { validateAndUpload } from '@/lib/meta';
import { BytemdPlugin } from 'bytemd';
import { FileImageOutlined, DownloadOutlined } from '@ant-design/icons';
import { renderToString } from 'react-dom/server';
import { ImageWall } from '@/components';
import { Err, OK, Wiki } from '@/dto';
import { LocalStorageArticleKey, LocalStorageWikiKey, WikiMeta } from '@/lib/meta/type';
import { EditorForm } from '@/components/editor/form';

const Updatable = ['wiki', 'article'] as const;
type UpdatableType = typeof Updatable[number];

let meta: {
  value: object | null | string;
} = {
  value: null,
};
const onUpload = (text: string, setUploading: (uploading: boolean) => void) => {
  setUploading(true);
  if (!meta.value) {
    notification.error({
      message: '未填写元数据',
      description: '我们使用 frontmatter 语法编写的元数据来识别上传的文章内容',
    });
    setUploading(false);
    return;
  }
  if (typeof meta.value === 'string') {
    notification.error({
      message: '元数据应该为对象而不是字符串',
      description: '请参考 yaml 语法，编写对象类型的元数据',
    });
    setUploading(false);
    return;
  }
  validateAndUpload(meta.value as any, text)
    .then(res => {
      notification.success({
        message: '上传成功',
      });
      console.log('meta', meta.value);
      console.log('api return', res);
      const v = meta.value as WikiMeta;
      if (v.type === 'wiki' && v.action === 'update') {
        localStorage.removeItem(LocalStorageWikiKey);
      }
    })
    .catch(err => {
      const error = err as Error;
      notification.error({
        message: error.name,
        description: error.message,
      });
      console.error(error);
    })
    .finally(() => {
      setUploading(false);
    });
};
export default function ArticleEditor() {
  const [value, setValue] = useState('');
  const { visible: imageWallVisible, open: openImageWall, close: closeImageWall } = useModal();
  const { visible: downloadVisible, open: openDownload, close: closeDownload } = useModal();
  const [uploading, setUploading] = useState(false);

  const fetchContent = async ({ title, type }: { title: string; type: UpdatableType }) => {
    if (!Updatable.includes(type)) {
      return;
    }
    const resp = await fetch(`/api/${type}/admin/get-by-title?title=${title}`);
    const json = (await resp.json()) as { content: string; id: string };
    if (resp.status !== OK.code) {
      const err = json as unknown as Err.Resp;
      notification.error({
        message: err.error,
        description: err.description,
      });
    } else {
      setValue(json.content);
      localStorage.setItem(type === 'wiki' ? LocalStorageWikiKey : LocalStorageArticleKey, json.id);
      closeDownload();
    }
  };
  useClearId();

  const [editorPlugins, setPlugin] = useState<BytemdPlugin[]>([]);
  useEffect(() => {
    setPlugin([
      gfm({
        locale: gfmZh,
      }),
      footnotes(),
      frontmatter(),
      modal({
        openModal: openImageWall,
        iconString: renderToString(<FileImageOutlined />),
        title: '打开图片库',
      }),
      modal({
        openModal: openDownload,
        iconString: renderToString(<DownloadOutlined />),
        title: '拉取文章',
      }),
      upload({
        onUpload(text) {
          onUpload(text, setUploading);
        },
      }),
      consumeMeta({
        onReceiveMeta(m) {
          meta.value = m;
        },
      }),
    ]);
  }, []);

  return (
    <>
      <Modal visible={imageWallVisible} onCancel={closeImageWall} mask footer={null} className='w-3/4-screen' centered>
        <ImageWall className='max-h-[60vh]'></ImageWall>
      </Modal>
      <Modal
        visible={downloadVisible}
        onCancel={closeDownload}
        mask
        footer={null}
        className='w-3/4-screen'
        closable={false}
        centered
      >
        <WikiDownloader fetchWiki={fetchContent} />
      </Modal>
      <div className='w-full'>
        <EditorStyle>
          <Typography>
            <Spin spinning={uploading}>
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
            </Spin>
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

function WikiDownloader({ fetchWiki }: { fetchWiki: (form: { title: string; type: UpdatableType }) => void }) {
  return (
    <Form requiredMark={false} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onFinish={fetchWiki}>
      <Form.Item
        label='标题'
        name='title'
        rules={[
          {
            required: true,
            type: 'string',
            message: '请输入标题',
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label='下载类型' name='type'>
        <Select>
          {Updatable.map(t => (
            <Select.Option key={t} value={t}>
              {t === 'wiki' ? 'Wiki' : '文章'}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 18, span: 2 }}>
        <Button type='primary' htmlType='submit'>
          下载
        </Button>
      </Form.Item>
    </Form>
  );
}
