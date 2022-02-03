import { Collapse } from 'antd';
import { Container, WikiSwitch } from '@/components';
import CISUFLogo from '@/public/assets/LOGO_0001_RM.png';
import RITCLogo from '@/public/assets/LOGO_0002_RB.png';
import NACSFLogo from '@/public/assets/LOGO_0003_NA.png';
import Image from 'next/image';
import Link from 'next/link';
const { Panel } = Collapse;
export default function WikiIndex() {
  return (
    <Container>
      <WikiSwitch
        navigation={[
          {
            image: NACSFLogo.src,
            url: '/wiki/NACSF',
          },
          {
            image: CISUFLogo.src,
            url: '/wiki/NACSF',
          },
          {
            image: RITCLogo.src,
            url: '/wiki/NACSF',
          },
        ]}
      ></WikiSwitch>
      还没做
      <Link href={'/wiki/NACSF/unit'}>坦克</Link>
    </Container>
  );
}
