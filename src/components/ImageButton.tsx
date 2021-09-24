import styled from 'styled-components';

export const ImageButton = styled.button<{ imagePath: string }>`
  background-image: url(${props => props.imagePath});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
