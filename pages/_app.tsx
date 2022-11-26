import 'antd/dist/antd.dark.css';
import '@/styles/index.css';

import { Layout } from '@/components/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />

        <meta name='og:title' content='世界轴承: RA2现代战争模组' />
        <title>世界轴承: RA2现代战争模组</title>
        <meta name='og:type' content='website' />
        {process.env.NEXT_PUBLIC_APP_ENV !== 'development' && (
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
        )}
        <meta name='og:locale' content='zh_CN' />
        <meta property='og:description' content={DefaultDescription} />
        <meta name='keywords' content={DefaultKeywords.join(',')} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
const DefaultDescription =
  '《世界轴承》是由斯卡雷特伯爵和逍遥自在发起的Antimo Project制作的PC游戏《命令与征服：红色警戒2尤里的复仇》的非官方模组。WA是一款以高质量美工和创意作为亮点的MOD，虽然是以《尤里的复仇》作为载体但是抛弃了几乎所有和《尤里的复仇》有关的东西，抛弃引擎来说可以看做是一款全新的游戏。';

const DefaultKeywords = [
  '世界轴承',
  '红色警戒2',
  '尤里的复仇',
  '红警',
  '虹',
  'world axletree',
  'red alert 2',
  "yuri's revenge",
  'command',
  'conquer',
  'mod',
  'modification',
  'modding',
  'missions',
  'regenbogen',
];
