import { ReactNode } from 'react';
import styled from 'styled-components';

interface TextProps {
  decorationWidth: number;
  decorationColor: string;
  children: ReactNode;
  className?: string;
}

const TextWrapper = styled.div<Omit<TextProps, 'children' | 'className'>>`
  border-left-width: ${props => props.decorationWidth}px;
  border-left-style: solid;
  border-left-color: ${props => props.decorationColor};
`;
export function Text({ children, className, ...rest }: TextProps) {
  return (
    <TextWrapper {...rest} className={'text-3xl pl-4 text-white ' + className}>
      {children}
    </TextWrapper>
  );
}
