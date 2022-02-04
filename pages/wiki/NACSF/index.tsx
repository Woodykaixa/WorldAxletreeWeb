import { Typography } from 'antd';
import { Container, WikiNavLink, WikiSwitch } from '@/components';
import { NACSF } from '@/util/side';
export default function WikiIndex() {
  return (
    <Container>
      <WikiSwitch></WikiSwitch>
      <Typography className='text-2xl px-8 py-12'>
        {NACSF.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <WikiNavLink href={`/wiki/${NACSF.nameEnAbbr}/unit`}>单位百科</WikiNavLink>
        <WikiNavLink href={`/wiki/${NACSF.nameEnAbbr}/building`}>建筑百科</WikiNavLink>
        <WikiNavLink href={`/wiki/${NACSF.nameEnAbbr}/support`}>支援技能</WikiNavLink>
      </Typography>
    </Container>
  );
}
