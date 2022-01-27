import Image, { ImageProps } from 'next/image';

type ObjectFit = ImageProps['objectFit'];

export type BackgroundImageProps = {
  path: string;
  alt?: string;
  className?: string;
  preload?: boolean;
  objectFit?: ObjectFit;
  quality?: number;
  position?: 'absolute' | 'fixed';
};

export function BackgroundImage({
  path,
  alt = '',
  className = '',
  preload = false,
  objectFit = 'cover',
  quality = 75,
  position = 'absolute',
}: BackgroundImageProps) {
  return (
    <div
      // https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
      // so we explicitly write class name here
      className={`${position === 'absolute' ? 'absolute' : 'fixed'} overflow-hidden -z-10 w-full h-full ${className}`}
    >
      <Image alt={alt} src={path} layout='fill' objectFit={objectFit} quality={quality} priority={preload} />
    </div>
  );
}
