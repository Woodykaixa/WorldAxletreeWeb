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
