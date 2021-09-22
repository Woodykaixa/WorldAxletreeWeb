import { ReactNode } from 'react';
export function SkewButton({ children, skewX }: { children: ReactNode; skewX: number }) {
  return (
    <button className='text-5xl font-bold bg-red-500 py-10 px-10' style={{ transform: `skewX(${skewX}deg)` }}>
      <div className='mx-15' style={{ transform: `skewX(${-skewX}deg)` }}>
        {children}
      </div>
    </button>
  );
}
