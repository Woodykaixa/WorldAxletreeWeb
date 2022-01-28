import { Container } from '@/components';
import { List, Avatar, Space, Skeleton } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';

type Item = {
  href: string;
  title: string;
  description: string;
  content: string;
};

const listData = [] as Item[];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
export default function NewsIndex() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as Item[]);

  const loadData = async () => {
    if (loading) {
      return;
    }
    try {
      const response = await fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo');
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }

      setData([
        ...data,
        ...json.results.map((o: any) => ({
          href: 'https://ant.design',
          title: o.name.last,
          description: o.email,
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        })),
      ]);
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
      <Container background='/assets/gw01.webp' preloadBackground>
        <div id='news-list'>
          <InfiniteScroll
            hasMore={data.length < 50}
            next={loadData}
            dataLength={data.length}
            loader={<Skeleton paragraph={{ rows: 2 }} active></Skeleton>}
          >
            <List
              itemLayout='vertical'
              size='large'
              locale={{
                emptyText: '暂无数据',
              }}
              dataSource={data}
              renderItem={item => (
                <div className='bg-[#686868] m-4 mb-8'>
                  <List.Item
                    key={item.title}
                    actions={[<Space key='date'>11年45月14日</Space>]}
                    extra={
                      <img
                        width={272}
                        alt='logo'
                        src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                      />
                    }
                  >
                    <List.Item.Meta
                      title={
                        <a href={item.href} className='text-2xl'>
                          {item.title}
                        </a>
                      }
                    />
                    <div className='break-all text-xl '>{item.content}</div>
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
