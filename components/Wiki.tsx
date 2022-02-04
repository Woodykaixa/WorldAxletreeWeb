import { Collapse, Typography } from 'antd';
import { Container, WikiSwitch } from '@/components';

import { EditorStyle } from '@/components/editor';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Wiki as DTO } from '@/dto';
const { Panel } = Collapse;

import { FC } from 'react';

export type WikiProps = { wiki: DTO.ListResp };
export const Wiki: FC<WikiProps> = ({ wiki }) => {
  return (
    <Container>
      <WikiSwitch></WikiSwitch>
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
