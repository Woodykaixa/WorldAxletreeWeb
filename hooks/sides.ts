import { Side } from '@/dto/side';
import useSWR from 'swr';
import { responsiveImageFragment, query } from '@/lib/cms';

export type WikiSwitchProps = {
  sides: Side[];
};

type SideProp = keyof Side;

export function useSides(props: SideProp[]) {
  const name = props.includes('name');
  const abbr = props.includes('abbr');
  const logo = props.includes('logo');
  const introduction = props.includes('introduction');
  const data = useSWR(
    [
      `query QuerySidesHook${name ? '($locale: SiteLocale)' : ''} {
    allSides {
      ${abbr ? 'abbr' : ''}
      ${name ? 'name(locale: $locale)' : ''}
      ${
        logo
          ? `logo {
        responsiveImage(imgixParams: {w: "128", h: "128"}) {
          ...responsiveImageFragment
        }
      }`
          : ''
      }
      ${introduction ? 'introduction' : ''}
    }
  }
  ${logo ? responsiveImageFragment : ''}`,
      name ? { locale: 'zh' } : {},
    ],
    (queryString, variables) => {
      return query<{ allSides: Array<Pick<Side, typeof props[number]>> }>(queryString, {
        variables,
      });
    }
  );
  return data;
}
