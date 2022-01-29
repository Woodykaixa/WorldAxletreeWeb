import { Container } from '@/components';
import { Menu } from 'antd';
import Link from 'next/link';

export default function AdminIndex() {
  return (
    <Container>
      <div className='flex'>
        <Menu theme='dark' style={{ width: 256 }} mode='inline' className='bg-[#5f5f5f] mr-4' selectedKeys={['']}>
          <Menu.Item key='editor'>
            <Link href='/admin/editor'>编辑器</Link>
          </Menu.Item>
          <Menu.Item key='image'>
            <Link href='/admin/image'>图片库</Link>
          </Menu.Item>
          <Menu.SubMenu title='使用说明' key='help'>
            <Menu.Item key='editor' className='bg-[#888888]'>
              <Link href='/admin/help/editor'>编辑器使用说明</Link>
            </Menu.Item>
            <Menu.Item key='image' className='bg-[#888888]'>
              <Link href='/admin/help/image'>图片库使用说明</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='placeholder1'></Menu.Item>
          <Menu.Item key='placeholder2'></Menu.Item>
          <Menu.Item key='unauth'>
            <Link href='/api/unauth'>退出管理员登录</Link>
          </Menu.Item>
        </Menu>
        <div>你好，管理员</div>
      </div>
    </Container>
  );
}
