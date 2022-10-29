import { ReactNode } from 'react';
import { Header, Footer } from '.';
import { Layout as AntLayout, Affix } from 'antd';
const { Header: AntHeader, Content, Footer: AntFooter } = AntLayout;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <AntLayout className='layout bg-transparent'>
      <Affix offsetTop={0}>
        <AntHeader className='h-full w-full p-0'>
          <Header />
        </AntHeader>
      </Affix>
      <Content>{children}</Content>
      <AntFooter className='p-0'>
        <Footer />
      </AntFooter>
    </AntLayout>
  );
}
