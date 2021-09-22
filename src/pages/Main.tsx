import { Container, SkewButton, Text } from '@/components';

export function Main() {
  return (
    <div className='flex flex-col'>
      <Container path='/assets/gw01.png' className='items-end' containerClassName='h-1/2'>
        <SkewButton skewX={-30}>探索《世界轴承》</SkewButton>
        <Text decorationColor='white' decorationWidth={2} className='py-6 my-8'>
          红色警戒写实现代战争模组，全新故事背景，全新参战阵营，等待你的加入
        </Text>
      </Container>
      <Container path='/assets/gw02.png' className='items-center'>
        <div className='text-white text-7xl text-center mb-12 font-bold'>欢迎来到《世界轴承》</div>
        <Text decorationColor='red' decorationWidth={2} className='text-3xl-2lh font-bold'>
          《世界轴承》是由斯卡雷特伯爵和逍遥自在发起的Antimo
          Project制作的PC游戏《命令与征服：红色警戒2尤里的复仇》的非官方模组。WA是一款以高质量美工和创意作为亮点的MOD，虽然是以《尤里的复仇》作为载体但是抛弃了几乎所有和《尤里的复仇》有关的东西，抛弃引擎来说可以看做是一款全新的游戏。
        </Text>
        <div className='flex justify-between mt-20'>
          <SkewButton className='px-20' skewX={-30}>
            故事背景
          </SkewButton>
          <SkewButton className='px-20' skewX={-30}>
            游戏特色
          </SkewButton>
          <SkewButton className='px-20' skewX={-30}>
            玩法介绍
          </SkewButton>
        </div>
      </Container>
    </div>
  );
}
