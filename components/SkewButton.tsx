import { ReactNode } from 'react';
export function SkewButton({ children, skewX, className }: { children: ReactNode; skewX: number; className?: string }) {
  return (
    <button
      className={'text-5xl font-bold bg-red-500 hover:bg-red-400 py-10 px-10 ' + className}
      style={{ transform: `skewX(${skewX}deg)` }}
    >
      <div className='mx-15' style={{ transform: `skewX(${-skewX}deg)` }}>
        {children}
      </div>
    </button>
  );
}
