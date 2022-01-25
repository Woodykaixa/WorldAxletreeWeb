import '@/styles/index.css';
import '~antd/dist/antd.css';

import { Layout } from '@/components/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
