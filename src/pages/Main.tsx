import { Container, FeaturePanel, ImageButton, SkewButton, Text } from '@/components';

export function Main() {
  return (
    <div className='flex flex-col'>
      <Container path='/assets/gw01.png' className='items-center'>
        <div className='mt-80'>
          <SkewButton skewX={-30}>探索《世界轴承》</SkewButton>
        </div>
        <Text decorationColor='white' decorationWidth={2} decorationPositions={['left']} className='py-6 my-8'>
          红色警戒写实现代战争模组，全新故事背景，全新参战阵营，等待你的加入
        </Text>
      </Container>
      <Container path='/assets/gw02.png' className='items-center'>
        <div className='text-white text-7xl text-center mb-12 font-bold'>欢迎来到《世界轴承》</div>
        <Text
          decorationColor='red'
          decorationWidth={4}
          decorationPositions={['left']}
          className='text-3xl-2lh font-bold'
        >
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
      <Container path='/assets/gw03.png' className='items-center'>
        <div className='text-white text-7xl text-center mb-12 font-bold'>故事背景</div>
        <Text
          decorationColor='red'
          decorationWidth={4}
          decorationPositions={['left', 'right']}
          className='text-3xl-2lh font-bold'
        >
          <p>“我们不仅贩卖军火，我们也贩卖战争。”</p>
          <p>21世纪初，虹（Regenbogen），这个拥有悠久历史的军工企业悄然崛起，其一个巨大的计划正在酝酿之中。</p>
          <p>
            在北约解体后，美国的影响力达到了历史的最低点，为了夺回失去的东西，以美国为首建立了一个新的联盟用来取代北约的作用。
          </p>
          <p>
            另一方面，作为第六次中东战争的最大赢家，俄罗斯摆脱了经济受限的枷锁，其军事实力得以回归到巨熊最强大的时候。
          </p>
          <p>
            北约的解体也促进了欧盟的解体，但是过不了多久便建立了欧洲联邦来对抗新的恐怖主义，而在大陆的另一头，当美国的战略重心逐渐向东倾斜时，亚太地区正逐渐成为中国的势力范围。
          </p>
        </Text>
      </Container>
      <Container path='/assets/gw04.png' className='items-center' containerClassName='w-5/6 items-center'>
        <div className='grid grid-cols-3 gap-4'>
          <FeaturePanel
            imagePath='/assets/gw04_ui01.png'
            title='第三次世界大战'
            desc='全新五大阵营加入游戏，并各自拥有独立的战役'
          />
          <FeaturePanel
            imagePath='/assets/gw04_ui02.png'
            title='新面孔'
            desc='新添上百单位，几乎重制原作所有内容，可以看作一款全新游戏'
          />
          <FeaturePanel
            imagePath='/assets/gw04_ui03.png'
            title='额外内容'
            desc='独一无二的游戏以外内容，包括全新设计的UI和成就功能，满足收集癖玩家的需求'
          />
        </div>
        <SkewButton skewX={0} className='w-1/3 mt-24 rounded-md'>
          立即下载《世界轴承》
        </SkewButton>
      </Container>
      <Container
        path='/assets/gw05.png'
        className='items-center'
        containerClassName='w-5/6 grid grid-rows-3 gap-4 1920:gap-12'
      >
        {PART_5_BUTTON_PROPS.map(props => (
          <ImageButton
            key={props.text}
            imagePath={props.imagePath}
            className='text-white font-bold w-full text-7xl py-8 1920:py-16'
          >
            {props.text}
          </ImageButton>
        ))}
      </Container>
    </div>
  );
}

const PART_5_BUTTON_PROPS = [
  {
    imagePath: '/assets/gw05_ui01.png',
    text: '新闻资讯',
  },
  {
    imagePath: '/assets/gw05_ui02.png',
    text: '游戏社群',
  },
  {
    imagePath: '/assets/gw05_ui03.png',
    text: '常见答疑',
  },
];
