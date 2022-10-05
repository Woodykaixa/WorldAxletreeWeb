import { Skeleton } from 'antd';
import { Container } from '@/components';
import { Button, Result } from 'antd';
import Link from 'next/link';

import React from 'react';
export default function Article() {
  return (
    <Container background='/assets/gw02.webp' preloadBackground>
      <Result
        status='404'
        title='找不到该页面'
        subTitle='抱歉，你访问的页面不存在。'
        extra={
          <Button type='primary'>
            <Link href='/'>返回首页</Link>
          </Button>
        }
      />
    </Container>
  );
}
