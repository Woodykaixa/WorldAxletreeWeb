import { ReactNode } from 'react';
import { BackgroundImage } from '.';

export function IndexWrapper({
  path,
  children,
  className,
  containerClassName = '',
  id,
}: {
  path: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <div id={id} className={'relative flex justify-center py-16 2xl:py-4 h-full ' + className}>
      <BackgroundImage path={path} alt='' preload />
      <div className={' flex flex-col justify-evenly w-3/4 min-h-[45vw] ' + containerClassName}>{children}</div>
    </div>
  );
}
