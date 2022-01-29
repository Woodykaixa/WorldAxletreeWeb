import { Container, ImageWall, ImageWallProps } from '@/components';
import { Image } from '@/dto/image';
import { message, Spin } from 'antd';
import { useEffect, useState } from 'react';

export default function ImageIndex() {
  const [loading, setLoading] = useState(true);
  const [initialImages, setInitialImages] = useState([] as ImageItem[]);
  useEffect(() => {
    fetchInitialList()
      .then(images => {
        setLoading(false);
        setInitialImages(images);
      })
      .catch(err => {
        console.error(err);
        message.error('获取图片列表失败');
      });
  }, []);

  return (
    <Container>
      <Spin spinning={loading}>
        <ImageWall initialImages={initialImages}></ImageWall>
      </Spin>
    </Container>
  );
}

type ImageItem = ImageWallProps['initialImages'][number];

async function fetchInitialList(): Promise<Array<ImageItem>> {
  const response = await fetch('/api/image/admin/list');
  const json = (await response.json()) as Image.ListResp;
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
