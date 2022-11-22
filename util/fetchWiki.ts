import type { WikiProps } from '@/components';
import { Wiki as DTO, OK } from '@/dto';
import { query, responsiveImageFragment } from '@/lib/cms';
import type { GetServerSideProps } from 'next';
export function fetchWiki(type: DTO.WikiType): GetServerSideProps<WikiProps> {
  return async ctx => {
    const { side } = ctx.params as Record<string, string>;
    const { allWikis: wiki, allSides } = await query(
      `query QueryWiki($side: String, $kind: String) {
      allWikis(orderBy: order_ASC, filter: {kind: {eq: $kind}, side: {eq: $side}}) {
        content
        order
        title
        updatedAt
        createdAt
        id
      }
      allSides {
        name
        logo {
          responsiveImage {
            ...responsiveImageFragment
          }
        }
        abbr
        visibility
      }
    }
    ${responsiveImageFragment}`,
      {
        variables: {
          side,
          kind: type,
        },
      }
    );

    return {
      props: {
        wiki,
        sides: allSides,
      },
    };
  };
}
