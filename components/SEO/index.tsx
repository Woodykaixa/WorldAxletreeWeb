import Head from 'next/head';

// https://moz.com/blog/meta-data-templates-123
export namespace SEOHeaders {
  export type ArticleHeadersProps = {
    title: string;
    description: string;
    image: string | null;
    url: string;
  };
  export function Article({ title, description, image, url }: ArticleHeadersProps) {
    return (
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
        {image && <meta property='twitter:image' content={image} />}
        {/*  Open Graph data */}
        <meta property='og:title' content={title} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={url} />
        {image && <meta property='og:image' content={image} />}
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={title} />
        {/* Schema.org markup for Google+ */}
        <meta itemProp='name' content={title} />
        <meta itemProp='description' content={description} />
        {image && <meta itemProp='image' content={image} />}
      </Head>
    );
  }
  export type IndexHeadersProps = {
    title?: string;
    description?: string;
    url?: string;
    keywords: string[];
  };

  export function Index({ title, description = DefaultDescription, url, keywords }: IndexHeadersProps) {
    const kw = keywords.length ? keywords : DefaultKeywords;
    return (
      <Head>
        <meta name='og:title' content={title} />
        <title>{title}</title>
        <meta name='og:type' content='website' />
        {process.env.NEXT_PUBLIC_APP_ENV === 'production' && url && <meta name='og:url' content={url} />}
        <meta name='og:locale' content='zh_CN' />
        <meta property='og:description' content={description} />
        <meta name='keywords' content={kw.join(',')} />
      </Head>
    );
  }
}

const DefaultDescription =
  '《世界轴承》是由斯卡雷特伯爵和逍遥自在发起的Antimo Project制作的PC游戏《命令与征服：红色警戒2尤里的复仇》的非官方模组。WA是一款以高质量美工和创意作为亮点的MOD，虽然是以《尤里的复仇》作为载体但是抛弃了几乎所有和《尤里的复仇》有关的东西，抛弃引擎来说可以看做是一款全新的游戏。';

const DefaultKeywords = [
  '世界轴承',
  '红色警戒2',
  '尤里的复仇',
  '红警',
  '虹',
  'world axletree',
  'red alert 2',
  "yuri's revenge",
  'command',
  'conquer',
  'mod',
  'modification',
  'modding',
  'missions',
  'regenbogen',
];
