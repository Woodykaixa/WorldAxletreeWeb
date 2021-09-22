import { ReactChild } from 'react';
function Container({ path, children }: { path: string; children: ReactChild }) {
  return (
    <div className='object-cover relative flex justify-center'>
      <img src={path} alt='' className='absolute -z-10 w-full select-none' />
      <div className='flex flex-col justify-end w-3/5 h-1/2'>
        <div>{children}</div>
      </div>
    </div>
  );
}
export function Main() {
  return (
    <div className='flex flex-col'>
      <Container path='/assets/gw01.png'>
        <>
          <button className='text-6xl bg-red-500 -skew-x-45 transform py-10 px-10'>
            <div className='skew-x-45 transform mx-15'>探索《世界轴承》</div>
          </button>
        </>
      </Container>
    </div>
  );
}
