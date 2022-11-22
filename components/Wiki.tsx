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
import { Side } from '@/dto/side';
type WikiType = {
  content: string;
  order: number;
  title: string;
  updatedAt: string;
  createdAt: string;
  id: string;
};
export type WikiProps = { wiki: WikiType[]; sides: Side[] };
export const Wiki: FC<WikiProps> = ({ wiki, sides }) => {
  return (
    <Container>
      <WikiSwitch sides={sides}></WikiSwitch>
      <Collapse>
        {wiki.map(w => (
          <Panel key={w.id} header={w.title}>
            <EditorStyle>
              <Typography>
                <div dangerouslySetInnerHTML={{ __html: w.content }}></div>
              </Typography>
            </EditorStyle>
          </Panel>
        ))}
      </Collapse>
    </Container>
  );
};
