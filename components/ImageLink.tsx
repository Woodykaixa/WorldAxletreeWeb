import { ReactNode } from 'react';
import styled from 'styled-components';
import { BackgroundImage } from '.';
import Link from 'next/link';
import { useRouter } from 'next/router';

// export const ImageButton = styled.button<{ imagePath: string }>`
//   background-image: url(${props => props.imagePath});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: contain;
// `;

export type ImageLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  image: string;
};

export function ImageLink({ image, children, href, className = '' }: ImageLinkProps) {
  const router = useRouter();
  const navigate = () => {
    router.push(href);
  };
  return (
    <button className={`relative flex flex-col items-center justify-center ${className}`} onClick={navigate}>
      <BackgroundImage preload path={image} className='w-full h-full bg-center' objectFit='contain' />
      <div>{children}</div>
    </button>
  );
}
