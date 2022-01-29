import { Container, ImageWall, ImageWallProps } from '@/components';
import { Image } from '@/dto/image';
import { message, Spin } from 'antd';
import { useEffect, useState } from 'react';

export default function ImageIndex() {
  return (
    <Container>
      <ImageWall></ImageWall>
    </Container>
  );
}
