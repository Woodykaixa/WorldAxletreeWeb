import { Container } from '@/components';
import { List, Divider, Space, Skeleton, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Cl, Notice } from '@/dto';
import moment from 'moment';
import Head from 'next/head';
import { PAGE_SIZE, useRecordList } from '@/hooks/record-list';
import { StructuredText } from 'react-datocms';

const placeHolder = '1'.repeat(PAGE_SIZE).split('');

export default function NoticePage() {
  const { records, loadMore, isLoadingInitialData, isLoadingMore, isReachingEnd } =
    useRecordList<Cl.Item>('/api/changelog/list');
  const loading = isLoadingInitialData || isLoadingMore;

  return (
    <>
      <Head>
        <meta name='og:title' content='更新日志 - 世界轴承' />
        <title>更新日志 - 世界轴承</title>
        {process.env.NEXT_PUBLIC_APP_ENV !== 'development' && (
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL + '/notice'} />
        )}
      </Head>
      <Container background='/assets/gw02.webp' preloadBackground>
        <div id='news-list'>
          <InfiniteScroll
            hasMore={!isReachingEnd}
            next={loadMore}
            dataLength={records.length}
            loader={loading && placeHolder.map((_, i) => <Skeleton key={i} paragraph={{ rows: 2 }} active></Skeleton>)}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          >
            <List
              itemLayout='vertical'
              size='large'
              locale={{
                emptyText: '暂无数据',
              }}
              dataSource={records}
              renderItem={item => (
                <div className='bg-[#383838] m-4 mb-8'>
                  <List.Item
                    key={item.id}
                    actions={[<Space key='date'>{moment(item.updatedAt).format('yyyy年MM月DD日 HH:mm:ss')}</Space>]}
                  >
                    <List.Item.Meta title={item.title}></List.Item.Meta>
                    <Typography>
                      <StructuredText data={item.content.value} />
                    </Typography>
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
