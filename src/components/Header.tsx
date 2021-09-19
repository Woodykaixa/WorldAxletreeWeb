import { Link } from 'react-router-dom';

function Button({ to, text }: { to: string; text: string }) {
  return (
    <Link className='my-2 py-2 px-8 opacity-80 hover:opacity-100' to={to}>
      {text}
    </Link>
  );
}
export function Header() {
  return (
    <header className='flex text-xl bg-black py-2 text-white items-center'>
      <img src='/assets/wa-logo.png' alt='World Axletree Logo' className='w-1/4 px-6 border-r-2 border-white' />
      <div className='w-4'></div>
      <ul className='col-span-2 flex w-2/5 2xl:w-1/3 justify-between'>
        <li>
          <Button to='/' text='资讯' />
        </li>
        <li>
          <Button to='/' text='介绍' />
        </li>
        <li>
          <Button to='/' text='社群' />
        </li>
        <li>
          <a className='my-2 py-2 px-8 bg-red-500 opacity-80 hover:opacity-100' href='https://www.baidu.com'>
            {/* TODO: replace baidu.com */}
            下载
          </a>
        </li>
      </ul>
      <div className='flex-1 flex justify-center'>
        <button className='border-white border-2 px-6 py-2 hover:bg-gray-700'>简体中文</button>
      </div>
      <img src='/assets/antimo-logo.png' alt='Antimo Project Logo' className='w-16 mx-6' />
    </header>
  );
}
