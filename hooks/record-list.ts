import { Err } from '@/dto';
import useSWRInfinite from 'swr/infinite';

export const PAGE_SIZE = 5;

const fetcher = (url: string) => fetch(url).then(res => res.json());

/**
 * @param apiUrl an api supports listing (accepts size and page)
 */
export function useRecordList<RecordType = any>(apiUrl: string) {
  const getKey = <RecordType = any>(index: number, data: RecordType[]) => {
    if (data && !data?.length) {
      return null;
    }
    return `${apiUrl}?size=${PAGE_SIZE}&page=${index}`;
  };
  const { data, setSize, error, size, isValidating } = useSWRInfinite<RecordType[], Err.Resp>(getKey, fetcher, {
    revalidateAll: false,
    revalidateFirstPage: false,
    revalidateIfStale: false,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const loadMore = () => setSize(size => size + 1);
  const records =
    data?.reduce((total, array) => {
      total.push(...array);
      return total;
    }, []) ?? [];

  return {
    records,
    loadMore,
    isReachingEnd,
    isLoadingMore,
    isLoadingInitialData,
    isEmpty,
    isRefreshing,
  };
}
