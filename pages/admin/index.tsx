import { Container } from '@/components';
import { Menu } from 'antd';
import Link from 'next/link';

export default function AdminIndex() {
  return (
    <Container>
      <div className='flex'>
        <Menu theme='dark' style={{ width: 256 }} mode='inline'>
          <Menu.Item key='editor'>
            <Link href='/admin/editor'>编辑器</Link>
          </Menu.Item>

          <Menu.Item key='unauth'>
            <Link href='/api/unauth'>退出管理员登录</Link>
          </Menu.Item>
        </Menu>
        你好，管理员
      </div>
    </Container>
  );
}
