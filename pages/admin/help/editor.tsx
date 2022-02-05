import ArticleEditor from '../editor';
import Head from 'next/head';
import { FileImageOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { EditorStyle } from '@/components/editor';
import { Typography } from 'antd';
import { Container } from '@/components';
import Link from 'next/link';
export default function EditorHelp() {
  return (
    <>
      <Head>
        <title>编辑器使用说明</title>
      </Head>
      <Container>
        <div className='p-20'>
          <EditorStyle>
            <Typography>
              <h2>编辑器语法</h2>
              <p>
                编辑器支持标准 Markdown 语法、GitHub Flavored Markdown 扩展语法、frontmatter 扩展语法、footnotes
                扩展语法。 通常来说已经满足使用需求，如果仍有其他语法需求可以联系我添加插件。 编辑器布局很简单
              </p>
              <h2>编辑器布局</h2>
              <div className='flex flex-col my-4'>
                <div className='w-full text-center items-center p-4 bg-[#252526] border-[#3c3c3c] border-2 '>
                  功能区
                </div>
                <div className='w-full flex flex-row'>
                  <div className='w-1/2 bg-[#1e1e1e] px-8 py-20 border-[#3c3c3c] border-2 border-r-0'>编辑器</div>
                  <div className='w-1/2 bg-[#1d1d1d] px-8 py-20 border-[#3c3c3c] border-l-white border-2'>预览区</div>
                </div>
              </div>
              <p>
                编辑器就是我们用来编辑文章的区域，编辑后会实时渲染在右侧预览区。这两个区域很简单，所以下面重点介绍功能区
                功能区左侧是 Markdown 语法的快捷键，当你不熟悉 Markdown
                语法时，可以用鼠标单击这些快捷键，会在光标位置插入相应的 Markdown 代码。 比如单击左功能区第三个按钮
                <svg
                  className='inline'
                  width='1em'
                  height='1em'
                  viewBox='0 0 48 48'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20 6h16M12 42h16M29 5.952 19 42'
                    stroke='currentColor'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                ，则会在光标位置语句的前后方插入 <code>*</code>，同时右侧预览区域可以看到该语句变为斜体。
                大多数按钮只是基本的语法按钮。只有功能区左侧的最后三个按钮具有特殊功能。
              </p>
              <p>
                <FileImageOutlined /> 是照片库按钮，点击后可以打开照片库对话框，其功能与
                <Link href='/admin/help/image'>照片库页面</Link>完全一致。
              </p>
              <p>
                <DownloadOutlined />{' '}
                是下载按钮。点击后可以打开一个对话框，在对话框中输入标题和类型，可以下载文章，以便于修改。
                务必使用下载按钮从数据库下载文章，然后再修改上传，而不是直接写好新文章然后上传。
                因为下载功能会在编辑器以外的地方记录文章id，通过id来更新指定文章，而不是通过标题。这样的设计可以提供修改标题的能力。
              </p>
              <p>
                <UploadOutlined className='text-red-500' />{' '}
                是上传按钮。因为不同的文章类型拥有不同的上传行为。所以我们使用基于 frontmatter
                语法的元数据来实现上传功能。
              </p>
              <h2>元数据</h2>
              <h3>什么是元数据</h3>
              <p>
                对于官网而言，元数据被用来识别文章类型以及其他信息。我们在前文中已经提到，不同的文章类型拥有不同的上传行为。
                所以需要使用元数据来告诉编辑器，我正在编写的文章是什么类型，它有哪些额外信息。
                你只需要填写几行固定格式的元数据，剩下的交给编辑器即可。
              </p>
              <h3>元数据格式</h3>
              <p>
                元数据基于 fromtmatter 语法，以 <code>---</code>
                开头和结尾，中间的内容就是元数据。
              </p>
              <p>
                中间的内容需要遵循 YAML 语法，但是我们并不需要那么多 YAML 的知识，只需要知道以 <code>key: value</code>
                的形式输入数据即可。其中 <code>key</code> 是元数据的字段，<code>value</code>{' '}
                是这个字段的值。值可以是一个字符串、数字、或数组。
              </p>
              <p>
                <b>注意: </b>在 <code>:</code> 后面请务必跟随至少一个空格，否则 <code>key:value</code>{' '}
                会被整体解析为一个<b className='text-red-500'>其他字段</b>，这会导致编辑器检测不到 <code>key</code> 和{' '}
                <code>value</code>
              </p>
              <h3>元数据整体逻辑</h3>
              <p>以一些公共的字段来区分上传类型，并在识别到类型后进一步检查、生成不同类型的文章各自需要的字段</p>
              <p>目前有以下公共字段: </p>
              <pre>
                <code>type: 只能选 notice, news , article , wiki 中的一个</code>
              </pre>
              <p>接下来还需要根据不同的类型，继续填写不同的元数据。</p>
              <p>不同类型的文章所需的元数据见下表</p>
              <h3>元数据一览</h3>
              <p>
                格式说明: 以 <code>|</code> 隔开多个可选值的类型叫做“枚举类型”，表示你只能填写枚举值中的一个。例如:{' '}
                <code>A | B | C</code> 表示这个字段只允许填写 A 或 B 或 C
              </p>
              <h4>动态</h4>
              <table>
                <tr>
                  <th>字段</th>
                  <th>类型</th>
                  <th>必填</th>
                  <th>描述</th>
                </tr>
                <tr>
                  <td>type</td>
                  <td>notice</td>
                  <td>是</td>
                  <td>上传文章类型</td>
                </tr>
              </table>
              <h4>资讯</h4>
              <table>
                <tr>
                  <th>字段</th>
                  <th>类型</th>
                  <th>必填</th>
                  <th>描述</th>
                </tr>
                <tr>
                  <td>type</td>
                  <td>news</td>
                  <td>是</td>
                  <td>上传文章类型</td>
                </tr>
                <tr>
                  <td>cover</td>
                  <td>字符串</td>
                  <td>否</td>
                  <td>
                    用于资讯封面的图片链接。如果填写，则资讯页面会展示该图片。链接需要以 <code>http</code> 或{' '}
                    <code>https</code> 开头
                  </td>
                </tr>
                <tr>
                  <td>title</td>
                  <td>字符串</td>
                  <td>是</td>
                  <td>文章标题</td>
                </tr>
              </table>
              <h4>Wiki</h4>
              <table>
                <tr>
                  <th>字段</th>
                  <th>类型</th>
                  <th>必填</th>
                  <th>描述</th>
                </tr>
                <tr>
                  <td>type</td>
                  <td>wiki</td>
                  <td>是</td>
                  <td>上传文章类型</td>
                </tr>
                <tr>
                  <td>action</td>
                  <td>new | update</td>
                  <td>否</td>
                  <td>上传操作，new 表示上传新文章，update 表示更新已有文章。默认为 new</td>
                </tr>
                <tr>
                  <td>kind</td>
                  <td>Unit | Building | Support | U | B | S</td>
                  <td>是</td>
                  <td>Wiki 类型，前三类分别表示单位、建筑、支援技能，后三类为前三类依次对应的简写</td>
                </tr>
                <tr>
                  <td>order</td>
                  <td>整数</td>
                  <td>是</td>
                  <td>Wiki 的展示顺序，数字小的会排在大的前面，如果两个 Wiki 的 order 相同，则由数据库自行排列。</td>
                </tr>
                <tr>
                  <td>title</td>
                  <td>字符串</td>
                  <td>是</td>
                  <td>文章标题</td>
                </tr>
                <tr>
                  <td>side</td>
                  <td>NACSF | CISUF | EFRRF | FECO | RITC</td>
                  <td>是</td>
                  <td>所属阵营，分别对应世界轴承中五个阵营的缩写</td>
                </tr>
              </table>
              <h2>发布示例</h2>
              <h3>发布动态</h3>
              <p>以发布动态为例，只需要在文章开头编写以下元数据</p>
              <pre>
                <code>
                  --- <br></br>
                  type: notice<br></br>
                  ---
                </code>
              </pre>
              <p>
                现在已经可以点击上传按钮发布了。这个类型的文章会被发布到 <Link href='/notice'>动态栏</Link>
              </p>
              <h3>发布资讯</h3>
              <p>
                再以发布资讯为例，首先填写公共字段 <code>type: news</code>，然后我们还需要填写资讯类型的私有字段
                <code>title</code>，<code>title</code> 是一个字符串，表示资讯的标题。
                至此，已经可以点击上传按钮发布咨询。 但是你还可以额外指定资讯的封面图片。使用 <code>cover</code>{' '}
                字段，提供一个封面图的链接即可。链接可以来自官网图库，也可以来自其他网站。
              </p>
              <p>至此，我们已经填写了上传资讯的全部元数据，最终填写的元数据如下</p>
              <pre>
                <code>
                  --- <br></br>
                  type: news<br></br>
                  title: 可以发布资讯了<br></br>
                  cover: 一个以 http 或 https 开头的图片链接 <br></br>
                  ---
                </code>
              </pre>
              <p>
                <b>
                  注意: 对于 <code>cover</code> 这类非必填的字段，请确保冒号后伴随空格来分隔，否则{' '}
                  <code>cover:图片链接</code> 会被整体解析为一个<b className='text-red-500'>其他字段</b>
                  ，导致编辑器无法识别到 <code>cover</code>，最终导致上传后无法检测到封面图
                </b>
              </p>
            </Typography>
          </EditorStyle>
          下面的编辑器与编辑器页面完全相同，快来试试吧
          <ArticleEditor />
        </div>
      </Container>
    </>
  );
}
