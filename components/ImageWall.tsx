import { Container } from '@/components';
import { Menu, Upload, UploadProps, List, Input, notification, Spin, Tooltip, Button, message, Modal } from 'antd';
import Link from 'next/link';
import { CopyOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { getDataUrl } from '@/util/image';
import { getFileInput } from '@/util/file';
import { useEffect, useRef, useState } from 'react';
import { Image as DTO } from '@/dto/image';
import { Err, OK } from '@/dto';
import { randString } from '@/util/rand';
import Image from 'next/image';

type ImageItem = {
  type: 'uploading' | 'done' | 'error';
  name: string;
  preview: string;
  id: string;
};

export type ImageWallProps = {
  onPreview?: typeof defaultPreview;
  onCopy?: typeof defaultCopy;
  className?: string;
};

function useRender() {
  const [_, __] = useState(false);
  return () => __(prev => !prev);
}

export function ImageWall({ onPreview = defaultPreview, onCopy = defaultCopy, className = '' }: ImageWallProps) {
  const imageRef = useRef([] as ImageItem[]);
  const [loading, setLoading] = useState(true);
  const render = useRender();
  useEffect(() => {
    fetchInitialList().then(list => {
      imageRef.current.push(...list);
      setLoading(false);
    });
  }, []);
  const onError = (filename: string) => {
    imageRef.current = imageRef.current.filter(image => image.name !== filename);
    render();
  };
  const onSuccess = (file: ImageItem) => {
    imageRef.current = imageRef.current.map(image => {
      if (image.name !== file.name) {
        return image;
      }
      return file;
    });
    render();
  };
  const uploadFile = async () => {
    const files = await getFileInput();
    if (files.length === 0) {
      return;
    }
    const [file] = files;

    const dataUrl = await getDataUrl(file);
    imageRef.current.push({
      id: file.name + randString(),
      type: 'uploading',
      preview: dataUrl,
      name: file.name,
    });
    render();
    const { data, ok } = await uploadImage(file);

    if (!ok) {
      let error: string | Err.Resp = data;
      try {
        error = JSON.parse(error);
      } finally {
        onError(file.name);
        notification.error(
          typeof error === 'string'
            ? {
                message: error,
              }
            : {
                message: error.error,
                description: error.description,
              }
        );
      }
      return;
    }
    const resp = JSON.parse(data) as DTO.CreateResp;
    onSuccess({
      id: resp.id,
      type: 'done',
      name: file.name,
      preview: process.env.NEXT_PUBLIC_BASE_URL + '/api/image/' + file.name,
    });
  };
  return (
    <Spin spinning={loading}>
      <div className={'flex flex-wrap overflow-y-auto ' + className}>
        {imageRef.current.map(image => (
          <div key={image.id} className='relative w-[200px] h-[200px] m-4 border-2 border-gray-500'>
            {image.type === 'uploading' && (
              <div className='bg-black opacity-50 flex items-center justify-center w-full h-full absolute z-10'>
                <Spin></Spin>
              </div>
            )}
            {image.type === 'done' && (
              <div className='bg-black opacity-0 hover:opacity-80 flex flex-col items-center justify-center flex-wrap w-full h-full absolute z-10'>
                <div className='flex'>
                  <Tooltip overlay={'复制图片链接'}>
                    <Button type='text' onClick={() => onCopy(image.preview)}>
                      <CopyOutlined />
                    </Button>
                  </Tooltip>
                  <Tooltip overlay={'预览图片'}>
                    <Button type='text' onClick={() => onPreview(image.preview)}>
                      <EyeOutlined />
                    </Button>
                  </Tooltip>
                  <Tooltip overlay={'删除该图片'}>
                    <Button
                      type='text'
                      onClick={() => {
                        Modal.confirm({
                          title: '即将删除图片: ' + image.name,
                          content: '图片删除后无法从数据库中恢复，是否继续？',
                          onOk: async () => {
                            const result = await deleteImage(image);
                            console.log(result.data);

                            if (!result.ok) {
                              message.error('删除失败: ' + result.data.error);
                              return;
                            }
                            imageRef.current = imageRef.current.filter(img => img.id !== image.id);
                            render();
                            message.success('删除成功');
                          },
                        });
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </div>
                <div className='text-white flex flex-wrap break-all text-center'>{image.name}</div>
              </div>
            )}
            <Image alt='' src={image.preview} width={200} height={200} objectFit='contain'></Image>
          </div>
        ))}
        <button onClick={uploadFile} className='w-[200px] h-[200px] bg-gray-700 hover:bg-gray-600 m-4'>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </div>
    </Spin>
  );
}

function defaultCopy(url: string) {
  navigator.clipboard.writeText(url).then(() => {
    message.info('图片链接已复制到剪贴板');
  });
}

function defaultPreview(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.click();
}

async function fetchInitialList(): Promise<Array<ImageItem>> {
  const response = await fetch('/api/image/admin/list');
  const json = (await response.json()) as DTO.ListResp;
  return json.map(item => {
    const result: ImageItem = {
      id: item.id,
      name: item.name,
      preview: process.env.NEXT_PUBLIC_BASE_URL + '/api/image/' + item.name,
      type: 'done',
    };
    return result;
  });
}

async function uploadImage(file: File) {
  const dataUrl = await getDataUrl(file);
  const dto: DTO.CreateDTO = {
    dataUrl,
    filename: file.name,
  };
  const response = await fetch('/api/image/admin/create', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dto),
  });
  const json = await response.text();
  return {
    response,
    ok: response.status === OK.code,
    data: json,
  };
}

async function deleteImage(image: ImageItem) {
  const dto: DTO.DeleteDTO = {
    id: image.id,
  };

  const resp = await fetch('/api/image/admin/delete', {
    method: 'DELETE',
    body: JSON.stringify(dto),
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await resp.json();
  const ok = resp.status === OK.code;
  if (ok) {
    return {
      data: data as DTO.DeleteResp,
      ok: true as const,
    };
  }
  return {
    data: data as Err.Resp,
    ok: false as const,
  };
}
