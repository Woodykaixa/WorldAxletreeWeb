import { Container } from '@/components';
import { Typography } from 'antd';
import { News, OK } from '@/dto';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { createBrief } from '@/util/brief';
import { EditorStyle } from '@/components/editor';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import frontmatter from '@bytemd/plugin-frontmatter';
import footnotes from '@bytemd/plugin-footnotes';

export default function NoticePage({ data }: ServerSideProps) {
  const title = data.title + ' - 世界轴承';
  const description = data.brief ?? undefined;
  const image = data.cover;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/news/${data.id}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        {/* Twitter Card data */}
        <meta name='twitter:card' content='summary' />
        {/* 如果有在推特上宣传的需求，可以注册账号然后修改以下两个标签 */}
        {/* <meta name='twitter:site' content='@RTMO_kaixa' /> */}
        {/* <meta name='twitter:creator' content='@RTMO_kaixa' /> */}
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        {image && <meta property='twitter:image' content={image.responsiveImage.src ?? undefined} />}
        {/*  Open Graph data */}
        <meta property='og:title' content={title} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={url} />
        {image && <meta property='og:image' content={image.responsiveImage.src ?? undefined} />}
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={title} />
        {/* Schema.org markup for Google+ */}
        <meta itemProp='name' content={title} />
        <meta itemProp='description' content={description} />
        {image && <meta itemProp='image' content={image.responsiveImage.src ?? undefined} />}
      </Head>
      <Container>
        <EditorStyle>
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </Typography>
        </EditorStyle>
      </Container>
    </>
  );
}
type ServerSideProps = {
  data: News.GetResp;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ctx => {
  const id = ctx.query.id;
  if (typeof id !== 'string') {
    return {
      notFound: true,
    };
  }
  const resp = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/news/' + id);
  const json = (await resp.json()) as News.GetResp;
  if (resp.status !== OK.code) {
    console.error('fetch', id, 'failed');
    console.error(json);
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: json,
    },
  };
};
