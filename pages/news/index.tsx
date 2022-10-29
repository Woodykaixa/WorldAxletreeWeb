import { Container } from '@/components';
import { List, Divider, Space, Skeleton, Typography } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { News, OK } from '@/dto';
import { makeError } from '@/lib/error';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/legacy/image';
import Link from 'next/link';

type NewsItem = News.ListResp[number];
const PAGE_SIZE = 5;
const placeHolder = '1'.repeat(PAGE_SIZE).split('');
export default function NoticePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as NewsItem[]);
  const [hasMore, setHasMore] = useState(true);
  const loadData = async () => {
    if (loading) {
      return;
    }
    try {
      const response = await fetch(`/api/news/list?size=${PAGE_SIZE}&page=${data.length / PAGE_SIZE}`);
      const respData = await response.text();
      if (response.status !== OK.code) {
        throw makeError(JSON.parse(respData));
      }
      const json = JSON.parse(respData) as News.ListResp;

      setData([...data, ...json]);
      if (json.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
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
            dataLength={data.length}
            loader={placeHolder.map((_, i) => (
              <Skeleton key={i} paragraph={{ rows: 2 }} active></Skeleton>
            ))}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          >
            <List
              itemLayout='vertical'
              size='large'
              locale={{
                emptyText: '暂无数据',
              }}
              dataSource={data}
              renderItem={item => (
                <div className='bg-[#383838] m-4 mb-8'>
                  <List.Item
                    key={item.id}
                    actions={[<Space key='date'>{moment(item.date).format('yyyy年MM月DD日 HH:mm:ss')}</Space>]}
                    extra={
                      item.coverUrl && (
                        <Image src={item.coverUrl} alt='' objectFit='contain' width={250} height={250}></Image>
                      )
                    }
                  >
                    <List.Item.Meta
                      title={<Link href={`/news/${item.id}`}>{item.title}</Link>}
                      description={item.brief + '...'}
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
