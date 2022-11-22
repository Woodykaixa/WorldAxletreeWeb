import Link from 'next/link';
import { ReactNode } from 'react';

export function WikiNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href}>
      <h3 className='hover:text-red-500 ease-linear transition'>{children}</h3>
    </Link>
  );
}
