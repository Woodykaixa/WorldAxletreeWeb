import { ReactNode } from 'react';
import styled from 'styled-components';

interface TextProps {
  decorationWidth: number;
  decorationColor: string;
  decorationPositions: Array<'left' | 'right'>;
  children: ReactNode;
  className?: string;
}

const TextWrapper = styled.div<Omit<TextProps, 'children' | 'className'>>`
  ${props => {
    const { decorationColor, decorationWidth, decorationPositions } = props;
    return decorationPositions.map(
      position => `
  border-${position}-width: ${props.decorationWidth}px;
  border-${position}-style: solid;
  border-${position}-color: ${props.decorationColor};
  `
    );
  }}
`;
export function Text({ children, className, ...rest }: TextProps) {
  return (
    <TextWrapper {...rest} className={'text-3xl px-6 text-white ' + className}>
      {children}
    </TextWrapper>
  );
}
