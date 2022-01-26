import { ReactNode } from 'react';
import { Header, Footer } from '.';
import styled from 'styled-components';
import { Layout as AntLayout, Affix } from 'antd';
const { Header: AntHeader, Content, Footer: AntFooter } = AntLayout;
import Image from 'next/image';
const Mask = styled.div`
  background-image: linear-gradient(to bottom, transparent 0%, #414141 40%);
`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <AntLayout className='layout bg-transparent'>
      <Affix offsetTop={0}>
        <AntHeader className='h-full w-full p-0'>
          <Header />
        </AntHeader>
      </Affix>
      <div>
        <p className='fixed top-24 -z-10 w-screen h-2/5-screen overflow-hidden'>
          <Image src={'/assets/gw01.webp'} alt='' layout='fill' objectFit='cover' quality={50}></Image>
        </p>
        <Mask className='fixed top-0 w-screen h-screen -z-10 ' />
        <Content>{children}</Content>
      </div>
      <AntFooter className='p-0'>
        <Footer />
      </AntFooter>
    </AntLayout>
  );
}
