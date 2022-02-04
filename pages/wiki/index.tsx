import { Descriptions, Typography } from 'antd';
import { Container } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { ImplementedSides } from '@/util/side';
import { ReactNode } from 'react';

const { Item } = Descriptions;
export default function WikiIndex() {
  return (
    <Container>
      <Typography className='flex justify-center items-center'>
        {ImplementedSides.map(side => (
          <div className='flex flex-1 flex-col items-center p-8' key={side.name}>
            <Image
              src={side.icon.x128!}
              alt={side.nameEnAbbr}
              width={128}
              height={128}
              layout='fixed'
              className='border-2 border-solid border-[#414141]'
            ></Image>
            <NavLink href={`/wiki/${side.nameEnAbbr}`}>阵营简介</NavLink>
            <NavLink href={`/wiki/${side.nameEnAbbr}/unit`}>单位百科</NavLink>
            <NavLink href={`/wiki/${side.nameEnAbbr}/building`}>建筑百科</NavLink>
            <NavLink href={`/wiki/${side.nameEnAbbr}/support`}>支援技能</NavLink>
          </div>
        ))}
      </Typography>
    </Container>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href}>
      <a>
        <h3 className='hover:text-red-500 ease-linear transition'>{children}</h3>
      </a>
    </Link>
  );
}
