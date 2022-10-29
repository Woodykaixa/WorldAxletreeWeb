import { Descriptions, Typography } from 'antd';
import { Container, WikiNavLink } from '@/components';
import Image from 'next/legacy/image';
import { ImplementedSides } from '@/util/side';

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
            <WikiNavLink href={`/wiki/${side.nameEnAbbr}`}>阵营简介</WikiNavLink>
            <WikiNavLink href={`/wiki/${side.nameEnAbbr}/unit`}>单位百科</WikiNavLink>
            <WikiNavLink href={`/wiki/${side.nameEnAbbr}/building`}>建筑百科</WikiNavLink>
            <WikiNavLink href={`/wiki/${side.nameEnAbbr}/support`}>支援技能</WikiNavLink>
          </div>
        ))}
      </Typography>
    </Container>
  );
}
