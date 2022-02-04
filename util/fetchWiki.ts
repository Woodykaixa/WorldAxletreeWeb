import type { WikiProps } from '@/components';
import { Wiki as DTO, OK } from '@/dto';
import type { GetServerSideProps } from 'next';
export function fetchWiki(side: DTO.Side, type: DTO.WikiType): GetServerSideProps<WikiProps> {
  return async ctx => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wiki/list?type=${type}&side=${side}`);
    const json = (await response.json()) as DTO.ListResp;
    if (response.status !== OK.code) {
      console.error('fetch wiki', side, type, 'failed:', json);
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
}
