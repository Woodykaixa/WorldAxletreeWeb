import { Collapse, Typography } from 'antd';
import { Container, WikiSwitch } from '@/components';
import CISUFLogo from '@/public/assets/LOGO_0001_RM.png';
import RITCLogo from '@/public/assets/LOGO_0002_RB.png';
import NACSFLogo from '@/public/assets/LOGO_0003_NA.png';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { OK, Wiki } from '@/dto';
import { FC } from 'react';
import { EditorStyle } from '@/components/editor';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
const { Panel } = Collapse;
const NaInfantry: FC<Props> = ({ wiki }) => {
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
      <Collapse>
        {wiki.map(w => (
          <Panel key={w.id} header={w.title}>
            <EditorStyle>
              <Typography>
                <Viewer value={w.content} plugins={[gfm(), footnotes(), frontmatter()]}></Viewer>
              </Typography>
            </EditorStyle>
          </Panel>
        ))}
      </Collapse>
    </Container>
  );
};

export default NaInfantry;

type Props = {
  wiki: Wiki.ListResp;
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/wiki/list?type=${Wiki.TypeMapping.Unit}&side=${Wiki.SideMapping.NACSF}`
  );
  const json = (await response.json()) as Wiki.ListResp;
  if (response.status !== OK.code) {
    console.error('fetch wiki failed', json);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      wiki: json,
    },
  };
};
