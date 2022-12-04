import { Container } from '@/components';
import { List, Divider, Space, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Err, News } from '@/dto';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import { Image as CmsImage } from 'react-datocms';

const PAGE_SIZE = 5;
const placeHolder = '1'.repeat(PAGE_SIZE).split('');

const fetcher = (url: string) => fetch(url).then(res => res.json());
const getKey = (index: number, data: News.ListResp) => {
  if (data && !data?.length) {
    return null;
  }
  return `/api/news/list?size=${PAGE_SIZE}&page=${index}`;
};

function useNewsList() {
  const { data, setSize, error, size, isValidating } = useSWRInfinite<News.ListResp, Err.Resp>(getKey, fetcher, {
    revalidateAll: false,
    revalidateFirstPage: false,
    revalidateIfStale: false,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const loadData = () => setSize(size => size + 1);
  const news =
    data?.reduce((total, array) => {
      total.push(...array);
      return total;
    }, []) ?? [];

  return {
    news,
    loadData,
    isReachingEnd,
    isLoadingMore,
    isLoadingInitialData,
    isEmpty,
    isRefreshing,
  };
}

export default function NoticePage() {
  const { isReachingEnd, loadData, news, isLoadingInitialData, isLoadingMore } = useNewsList();
  const hasMore = !isReachingEnd;
  const loading = isLoadingInitialData || isLoadingMore;
  return (
    <>
      <Head>
        <meta name='og:title' content='资讯 - 世界轴承' />
        <title>资讯 - 世界轴承</title>
        {process.env.NEXT_PUBLIC_APP_ENV !== 'development' && (
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL + '/news'} />
        )}
      </Head>
      <Container background='/assets/gw02.webp' preloadBackground>
        <div id='news-list'>
          <InfiniteScroll
            hasMore={hasMore}
            next={loadData}
            dataLength={news.length}
            loader={loading && placeHolder.map((_, i) => <Skeleton key={i} paragraph={{ rows: 2 }} active></Skeleton>)}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          >
            <List
              itemLayout='vertical'
              size='large'
              locale={{
                emptyText: '暂无数据',
              }}
              dataSource={news}
              renderItem={item => (
                <div className='bg-[#383838] m-4 mb-8'>
                  <List.Item
                    key={item.id}
                    actions={[<Space key='date'>{moment(item.createdAt).format('yyyy年MM月DD日 HH:mm:ss')}</Space>]}
                    extra={
                      item.cover && (
                        <CmsImage
                          pictureClassName='object-contain'
                          data={{
                            ...item.cover.responsiveImage,
                            width: 250,
                            height: 250,
                            aspectRatio: 1,
                          }}
                        />
                      )
                    }
                  >
                    <List.Item.Meta
                      title={<Link href={`/news/${item.id}`}>{item.title}</Link>}
                      description={item.brief}
                    />
                  </List.Item>
                </div>
              )}
            />
          </InfiniteScroll>
        </div>
      </Container>
    </>
  );
}
