import { ReactNode } from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div<{ path: string }>`
  background-image: url(${props => props.path});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 45vw;
`;

export function Container({
  path,
  children,
  className,
  containerClassName,
}: {
  path: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <ContainerWrapper path={path} className={'flex justify-center ' + className}>
      <div className={'flex flex-col w-3/4 ' + containerClassName}>
        <div>{children}</div>
      </div>
    </ContainerWrapper>
  );
}
