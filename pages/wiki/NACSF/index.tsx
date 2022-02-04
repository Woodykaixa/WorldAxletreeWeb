import { Typography } from 'antd';
import { Container, WikiSwitch } from '@/components';
import { NACSF } from '@/util/side';
export default function WikiIndex() {
  return (
    <Container>
      <WikiSwitch></WikiSwitch>
      <Typography className='text-2xl px-8 py-12'>
        {NACSF.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Typography>
    </Container>
  );
}
