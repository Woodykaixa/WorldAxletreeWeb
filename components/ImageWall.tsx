import { Container } from '@/components';
import { Menu, Upload, UploadProps, List, Input, notification, Spin, Tooltip, Button, message } from 'antd';
import Link from 'next/link';
import { CopyOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { getDataUrl } from '@/util/image';
import { getFileInput } from '@/util/file';
import { useEffect, useState } from 'react';
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
};

export function ImageWall({ onPreview = defaultPreview, onCopy = defaultCopy }: ImageWallProps) {
  const [images, setImages] = useState([] as ImageItem[]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchInitialList().then(list => {
      setImages([...images, ...list]);
      setLoading(false);
    });
  }, []);

  const uploadFile = async () => {
    const files = await getFileInput();
    if (files.length === 0) {
      return;
    }
    const [file] = files;

    const dataUrl = await getDataUrl(file);
    const dto: DTO.CreateDTO = {
      dataUrl,
      filename: file.name,
    };
    const request = fetch('/api/image/admin/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dto),
    });
    let newImages: ImageItem[] = [
      ...images,
      {
        id: file.name + randString(),
        type: 'uploading',
        preview: dataUrl,
        name: file.name,
      },
    ];
    setImages(newImages);
    const response = await request;
    const data = await response.text();

    if (response.status !== OK.code) {
      const error = JSON.parse(data) as Err.Resp;
      newImages = newImages.filter(image => image.name !== file.name);
      setImages(newImages);
      notification.error({
        message: error.error,
        description: error.description,
      });
    } else {
      const resp = JSON.parse(data) as DTO.CreateResp;
      newImages = newImages.map(image => {
        if (image.name !== file.name) {
          return image;
        }
        return {
          ...image,
          id: resp.id,
          type: 'done',
        };
      });
      setImages(newImages);
    }
  };
  return (
    <Spin spinning={loading}>
      <div className='flex flex-wrap'>
        {images.map(image => (
          <div key={image.id} className='relative w-[200px] h-[200px] m-4 border-2 border-gray-500'>
            {image.type === 'uploading' && (
              <div className='bg-black opacity-50 flex items-center justify-center w-full h-full absolute z-10'>
                <Spin></Spin>
              </div>
            )}
            {image.type === 'done' && (
              <div className='bg-black opacity-0 hover:opacity-80 flex items-center justify-evenly flex-wrap w-full h-full absolute z-10'>
                <Tooltip overlay={'删除该图片'}>
                  <Button
                    type='text'
                    onClick={() => {
                      message.error('尚未实现。在做了在做了。');
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
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
