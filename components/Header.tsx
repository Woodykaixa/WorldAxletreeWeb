import Link from 'next/link';
import Image from 'next/legacy/image';
import AntimoLogo from '@/public/assets/antimo-logo.webp';
import WaLogo from '@/public/assets/wa.webp';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

export function Header() {
  return (
    <header className='flex text-xl bg-black py-2 text-white items-center px-4'>
      <Link href='/' passHref>
        <div className='px-6 border-r-2 border-white cursor-pointer'>
          <Image
            src={WaLogo.src}
            alt='World Axletree Logo'
            layout='intrinsic'
            width={WaLogo.width / 4}
            height={WaLogo.height / 4}
          />
        </div>
      </Link>
      <div className='w-4  '></div>
      <HeaderMenu layout={HeaderLayout} />
      <div className='m-4 1920:m-0 1920:flex-1 flex justify-center'>
        <button className='border-white border-2 px-6 py-2 hover:bg-gray-700'>简体中文</button>
      </div>
      <Image
        src={AntimoLogo.src}
        alt='Antimo Project Logo'
        className='w-16 mx-6'
        width={AntimoLogo.width / 13}
        height={AntimoLogo.height / 13}
        layout='intrinsic'
      />
    </header>
  );
}

type MenuItem = { title: string; link: string };

type DropdownMenu = {
  text: ReactNode;
  menu: MenuItem[];
  key: string;
};

type HeaderMenuProps = {
  layout: DropdownMenu[];
};

const HeaderLayout: HeaderMenuProps['layout'] = [
  {
    text: (
      <>
        资讯 <DownOutlined className='text-2xl' />
      </>
    ),
    key: 'news',
    menu: [
      { link: '/changelog', title: '最新版本' },
      { link: '/news', title: '最新资讯' },
      { link: '/notice', title: '动态' },
    ],
  },
  {
    text: (
      <>
        介绍 <DownOutlined className='text-2xl' />
      </>
    ),
    key: 'introduction',
    menu: [
      { link: '/', title: '故事背景' },
      { link: '/wiki', title: '单位百科' },
      { link: '/article', title: '食用指南' },
    ],
  },
  {
    text: (
      <>
        社群 <DownOutlined className='text-2xl' />
      </>
    ),
    key: 'groups',
    menu: [
      { link: '/', title: '官方社群' },
      { link: '/', title: '加入我们' },
    ],
  },
];

function HeaderMenu({ layout }: HeaderMenuProps) {
  return (
    <ul className='hidden md:flex flex-1 w-2/5 2xl:w-1/3 justify-between text-white'>
      {layout.map(menu => (
        <li key={menu.key}>
          <Dropdown
            placement='bottomCenter'
            overlay={
              <Menu className='px-4 py-2 bg-black'>
                {menu.menu.map(item => (
                  <Menu.Item key={item.title} className='py-4 text-center opacity-80 hover:opacity-100 hover:bg-black'>
                    <Link href={item.link} passHref className='text-2xl text-white'>
                      {item.title}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <a className='text-white border-0 bg-black text-2xl my-2 py-2 px-8 opacity-80 hover:opacity-100'>
              {menu.text}
            </a>
          </Dropdown>
        </li>
      ))}
      <li>
        <a
          href='https://www.baidu.com'
          target='_blank'
          rel='noopener noreferrer'
          className='my-2 py-2 px-8 bg-red-500 opacity-80 hover:opacity-100 text-white  text-2xl'
        >
          下载
        </a>
      </li>
    </ul>
  );
}
