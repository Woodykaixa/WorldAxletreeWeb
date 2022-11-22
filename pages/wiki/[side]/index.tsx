import { Typography } from 'antd';
import { Container, WikiSwitch, WikiNavLink } from '@/components';
import { GetStaticProps, GetStaticPaths } from 'next';
import { query, responsiveImageFragment } from '@/lib/cms';
import { Side } from '@/dto/side';

type Props = {
  sides: Side[];
  currentSide: Side | undefined;
};

export default function WikiIndex({ sides, currentSide }: Props) {
  return (
    <Container>
      <WikiSwitch sides={sides}></WikiSwitch>
      {currentSide && (
        <Typography className='text-2xl px-8 py-12'>
          <div dangerouslySetInnerHTML={{ __html: currentSide.introduction }}></div>
          <WikiNavLink href={`/wiki/${currentSide.abbr}/unit`}>单位百科</WikiNavLink>
          <WikiNavLink href={`/wiki/${currentSide.abbr}/building`}>建筑百科</WikiNavLink>
          <WikiNavLink href={`/wiki/${currentSide.abbr}/support`}>支援技能</WikiNavLink>
        </Typography>
      )}
    </Container>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
  const side = ctx!.params!.side! as string;
  const data = await query<{ allSides: Side[] }>(
    `query QuerySides {
    allSides(orderBy: internalOrder_ASC) {
      introduction
      name
      logo {
        responsiveImage(imgixParams: {w: "128", h: "128"}) {
          ...responsiveImageFragment
        }
      }
      abbr
      visibility
    }
  }
  ${responsiveImageFragment}`
  );
  const currentSide = data.allSides.find(s => s.abbr === side)!;
  if (side && currentSide) {
    return {
      props: {
        currentSide,
        sides: data.allSides,
      },
    };
  }
  return {
    props: {
      currentSide: undefined,
      sides: [],
    },
    redirect: {
      permanent: false,
      destination: 404,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await query<{
    allSides: [{ abbr: string }];
  }>(`query QuerySideAbbr {
    allSides(filter: {visibility: {eq: "true"}}, orderBy: internalOrder_ASC) {
      abbr
    }
  }`);
  return {
    paths: data.allSides.map(side => ({ params: { side: side.abbr } })),
    fallback: true,
  };
};
