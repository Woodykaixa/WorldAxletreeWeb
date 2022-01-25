import { ReactNode } from 'react';
import { Header, Footer } from '.';
import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
const { Header: AntHeader, Content, Footer: AntFooter } = AntLayout;
import Image from 'next/image';
const Mask = styled.div`
  background-image: linear-gradient(to bottom, transparent 0%, #414141 40%);
`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <AntLayout className='layout bg-transparent'>
      <AntHeader
        className='fixed z-10 w-full p-0'
        style={{
          height: '100px',
        }}
      >
        <Header />
      </AntHeader>
      <div style={{ marginTop: '100px' }}>
        <p className='fixed top-24 -z-10 w-screen h-2/5-screen overflow-hidden'>
          <Image src={'/assets/gw01.png'} alt='' layout='fill' objectFit='cover' quality={50}></Image>
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
