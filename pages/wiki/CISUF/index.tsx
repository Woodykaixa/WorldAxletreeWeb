import { Typography } from 'antd';
import { Container, WikiSwitch, WikiNavLink } from '@/components';
import { CISUF } from '@/util/side';
export default function WikiIndex() {
  return (
    <Container>
      <WikiSwitch></WikiSwitch>
      <Typography className='text-2xl px-8 py-12'>
        {CISUF.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <WikiNavLink href={`/wiki/${CISUF.nameEnAbbr}/unit`}>单位百科</WikiNavLink>
        <WikiNavLink href={`/wiki/${CISUF.nameEnAbbr}/building`}>建筑百科</WikiNavLink>
        <WikiNavLink href={`/wiki/${CISUF.nameEnAbbr}/support`}>支援技能</WikiNavLink>
      </Typography>
    </Container>
  );
}
