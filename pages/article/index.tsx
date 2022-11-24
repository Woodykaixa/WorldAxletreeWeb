import { Container } from '@/components';
import { List, Divider, Space, Spin, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Article, Err } from '@/dto';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import styled from 'styled-components';

const NewsList = styled.div`
  & .infinite-scroll-component {
    min-height: 100vh;
  }
`;

const fetcher = (url: string) => fetch(url).then(res => res.json());
const getKey = (index: number, data: Article.ListResp) => {
  if (data && !data?.length) {
    return null;
  } // reached the end
  return `/api/article/list?size=${PAGE_SIZE}&page=${index}`;
};
const PAGE_SIZE = 5;
export default function NoticePage() {
  const { data, setSize } = useSWRInfinite<Article.ListResp, Err.Resp>(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateAll: false,
  });
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const loadData = () => setSize(size => size + 1);
  const total =
    data?.reduce((total, data) => {
      return total + data.length;
    }, 0) ?? 0;
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
        <NewsList id='news-list'>
          <InfiniteScroll
            hasMore={!isReachingEnd}
            refreshFunction={loadData}
            next={loadData}
            dataLength={total}
            loader={<Spin>loading</Spin>}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          >
            <List
              itemLayout='vertical'
              size='large'
              locale={{
                emptyText: '暂无数据',
              }}
              dataSource={data ?? []}
              renderItem={list =>
                list.map((item, index) => (
                  <div className='bg-[#383838] m-4 mb-8' key={index}>
                    <List.Item
                      key={item.id}
                      actions={[
                        <Space key='date'>{moment(item.updatedAt).format('yyyy年MM月DD日 HH:mm:ss')}</Space>,
                        <Space key='keywords'>
                          {item.keywords.map(kw => (
                            <Tag key={kw}>{kw}</Tag>
                          ))}
                        </Space>,
                      ]}
                    >
                      <List.Item.Meta
                        title={<Link href={`/article/${item.id}`}>{item.title}</Link>}
                        description={item.brief ? item.brief + '...' : undefined}
                      />
                    </List.Item>
                  </div>
                ))
              }
            />
          </InfiniteScroll>
        </NewsList>
      </Container>
    </>
  );
}
