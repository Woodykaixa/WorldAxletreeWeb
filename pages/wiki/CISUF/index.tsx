import { Typography } from 'antd';
import { Container, WikiSwitch } from '@/components';
import { CISUF } from '@/util/side';
export default function WikiIndex() {
  return (
    <Container>
      <WikiSwitch></WikiSwitch>
      <Typography className='text-2xl px-8 py-12'>
        {CISUF.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Typography>
    </Container>
  );
}
