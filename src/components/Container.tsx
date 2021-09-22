import { ReactNode } from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div<{ path: string }>`
  background-image: url(${props => props.path});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 45vw;
`;

export function Container({ path, children }: { path: string; children: ReactNode }) {
  return (
    <ContainerWrapper path={path} className='flex justify-center items-end'>
      <div className='flex flex-col w-3/4 h-1/2 '>
        <div>{children}</div>
      </div>
    </ContainerWrapper>
  );
}
