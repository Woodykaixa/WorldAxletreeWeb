import Link from 'next/link';
import Image from 'next/image';
import AntimoLogo from '@/assets/antimo-logo.png';
import WaLogo from '@/assets/wa.png';

function Button({ to, text }: { to: string; text: string }) {
  return (
    <Link href={to} passHref>
      <a className='my-2 py-2 px-8 opacity-80 hover:opacity-100'>{text}</a>
    </Link>
  );
}
export function Header() {
  return (
    <header className='flex text-xl bg-black py-2 text-white items-center'>
      <div className='px-6 border-r-2 border-white '>
        <Image
          src={WaLogo.src}
          alt='World Axletree Logo'
          layout='fixed'
          width={WaLogo.width / 4}
          height={WaLogo.height / 4}
        />
      </div>
      <div className='w-4  '></div>
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
      <Image
        src={AntimoLogo.src}
        alt='Antimo Project Logo'
        className='w-16 mx-6'
        width={AntimoLogo.width / 3}
        height={AntimoLogo.height / 3}
        layout='fixed'
      />
    </header>
  );
}
