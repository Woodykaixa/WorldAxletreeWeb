import { ReactNode } from 'react';
export function SkewButton({
  children,
  skewX,
  className,
  link,
}: {
  children: ReactNode;
  skewX: number;
  className?: string;
  link?: string;
}) {
  return (
    <button
      className={
        'text-black font-bold bg-red-500 hover:bg-red-400 py-10 px-10 ease-linear transition ' + className ?? ''
      }
      style={{ transform: `skewX(${skewX}deg)` }}
    >
      <div className='mx-15' style={{ transform: `skewX(${-skewX}deg)` }}>
        {link ? (
          <a href={link} className='hover:text-black'>
            {children}
          </a>
        ) : (
          children
        )}
      </div>
    </button>
  );
}
