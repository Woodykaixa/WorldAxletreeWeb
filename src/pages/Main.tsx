import { Container, SkewButton, Text } from '@/components';

export function Main() {
  return (
    <div className='flex flex-col'>
      <Container path='/assets/gw01.png'>
        <SkewButton skewX={-30}>探索《世界轴承》</SkewButton>
        <Text decorationColor='white' decorationWidth={2} className='py-6 my-8'>
          红色警戒写实现代战争模组，全新故事背景，全新参战阵营，等待你的加入
        </Text>
      </Container>
    </div>
  );
}
