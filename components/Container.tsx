import { ReactNode } from 'react';
import { BackgroundImage } from '.';
import styled from 'styled-components';

const Mask = styled.div`
  background-image: linear-gradient(to bottom, transparent 0%, #414141 40%);
`;

export type ContainerProps = {
  children: ReactNode;
  background?: string;
  preloadBackground?: boolean;
};
export function Container({ children, background, preloadBackground }: ContainerProps) {
  return (
    <div className='flex flex-col m-16 mt-24 bg-article-main min-h-screen p-4'>
      <div className='h-screen w-screen -z-20 bg-[#414141] fixed left-0 top-0' />
      {background && (
        <BackgroundImage
          path={background}
          preload={preloadBackground}
          className='left-0 top-0 h-2/5-screen '
          position='fixed'
        />
      )}
      <Mask className='-z-10 fixed w-screen h-screen left-0 top-0'></Mask>
      {children}
    </div>
  );
}
