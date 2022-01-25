export function FeaturePanel({ imagePath, title, desc }: { imagePath: string; title: string; desc: string }) {
  return (
    <div className='flex flex-col items-center'>
      <img src={imagePath} alt='' style={{ width: '30vw' }} className='pl-4' />
      <p className='text-red-500 font-bold text-4xl text-center my-10'>{title}</p>
      <p className='text-white font-bold text-3xl w-4/5'>{desc}</p>
    </div>
  );
}
