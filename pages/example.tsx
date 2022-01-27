import { Skeleton } from 'antd';
import { Container } from '@/components';

export default function Article() {
  return (
    <Container background='/assets/gw02.webp' preloadBackground>
      <div className='flex p-4'>
        <Skeleton.Image />
        <Skeleton loading active paragraph className='ml-8'></Skeleton>
      </div>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
    </Container>
  );
}
