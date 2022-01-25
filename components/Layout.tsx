import { ReactNode } from 'react';
import { Header } from '.';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
}
