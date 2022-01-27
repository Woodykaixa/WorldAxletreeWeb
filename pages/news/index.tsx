import { Container } from '@/components';
import { SEOHeaders } from '@/components/SEO';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import * as React from 'react';

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
  return (
    <>
      <SEOHeaders.Index title='资讯 - 世界轴承' keywords={[]} />
      <Container background='/assets/gw01.webp' preloadBackground>
        <List
          itemLayout='vertical'
          size='large'
          locale={{
            emptyText: '暂无数据',
          }}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={listData}
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
      </Container>
    </>
  );
}
