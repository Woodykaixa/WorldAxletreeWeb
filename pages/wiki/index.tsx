import { Typography } from 'antd';
import { Container, WikiNavLink } from '@/components';
import { Image as CmsImage, ResponsiveImageType } from 'react-datocms';
import { GetStaticProps } from 'next';
import { query, responsiveImageFragment } from '@/lib/cms';
import { SiteLocale } from '@/util/locale';

type Side = {
  abbr: string;
  name: string;
  logo: {
    responsiveImage: ResponsiveImageType;
  };
};

type Props = {
  sides: Side[];
};

export default function WikiIndex({ sides }: Props) {
  return (
    <Container>
      <Typography className='flex justify-center items-center'>
        {sides.map(side => (
          <div className='flex flex-1 flex-col items-center p-8' key={side.name}>
            <CmsImage
              data={{
                ...side.logo.responsiveImage,
                alt: side.name,
              }}
              className='border-2 border-solid border-[#414141]'
            />
            <WikiNavLink href={`/wiki/${side.abbr}`}>阵营简介</WikiNavLink>
            <WikiNavLink href={`/wiki/${side.abbr}/unit`}>单位百科</WikiNavLink>
            <WikiNavLink href={`/wiki/${side.abbr}/building`}>建筑百科</WikiNavLink>
            <WikiNavLink href={`/wiki/${side.abbr}/support`}>支援技能</WikiNavLink>
          </div>
        ))}
      </Typography>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const locale: SiteLocale = 'zh';
  const data = await query<{
    allSides: Side[];
  }>(
    `query QuerySides($locale: SiteLocale) {
    allSides(filter: {visibility: {eq: "true"}}, orderBy: internalOrder_ASC) {
      abbr
      name(locale: $locale)
      logo {
        responsiveImage(imgixParams: {w: "128", h: "128"}) {
          ...responsiveImageFragment
        }
      }
    }
  }
  ${responsiveImageFragment}`,
    {
      variables: {
        locale,
      },
    }
  );
  return {
    props: {
      sides: data.allSides,
    },
  };
};
