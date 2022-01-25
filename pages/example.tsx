import { Skeleton } from 'antd';

export default function Article() {
  return (
    <div className='flex flex-col m-16 mt-24 bg-article-main min-h-screen p-4'>
      <div className='flex p-4'>
        <Skeleton.Image />
        <Skeleton loading active paragraph className='ml-8'></Skeleton>
      </div>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
      <Skeleton loading active paragraph className='p-4'></Skeleton>
    </div>
  );
}
