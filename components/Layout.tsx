import { ReactNode } from 'react';
import { Header } from '.';
import { Footer } from '.';
import styled from 'styled-components';

import Image from 'next/image';
const Mask = styled.div`
  background-image: linear-gradient(to bottom, transparent 0%, #414141 40%);
`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div>
        <p className='fixed top-0 -z-10 w-screen h-2/5-screen overflow-hidden'>
          <Image src={'/assets/gw01.png'} alt='' layout='fill' objectFit='cover' quality={50}></Image>
        </p>
        <Mask className='fixed top-0 w-screen h-screen -z-10 ' />
        {/* <p className='fixed top-0 bg-gradient-to-t from-gray-900 w-screen h-screen'></p> */}
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
