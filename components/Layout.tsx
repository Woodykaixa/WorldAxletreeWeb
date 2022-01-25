import { ReactNode } from 'react';
import { Header } from '.';
import { Anchor } from 'antd';
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
}
