import { ReactNode } from 'react';
import { Header } from '.';
import { Footer } from '.';
import styled from 'styled-components';

import Image from 'next/image';
const MainContainer = styled.main`
  background-color: red;
`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main>
        {children}
        <Image
          src={'/assets/gw03.png'}
          alt=''
          layout='fill'
          objectFit='cover'
          className='-z-10 bg-gradient-to-t from-gray-700'
        ></Image>
      </main>
      <Footer />
    </div>
  );
}
