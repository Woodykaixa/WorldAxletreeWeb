import ArticleEditor from '../editor';
import Head from 'next/head';
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';
import { EditorStyle } from '@/components/editor';
import { Typography } from 'antd';
import { Container, ImageWall, ImageWallProps } from '@/components';
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
                大多数按钮只是基本的语法按钮。
              </p>
              <p>有两个需要特别注意，则是左功能区的最后两个按钮。</p>
              <p>
                <FileImageOutlined /> 是照片库按钮，点击后可以打开照片库对话框，其功能与
                <Link href='/admin/help/image'>照片库页面</Link>完全一致。
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
                的形式输入数据即可。
              </p>
              <h3>元数据整体逻辑</h3>
              <p>以一些公共的字段来区分上传类型，并在识别到类型后进一步检查、生成不同类型的文章各自需要的字段</p>
              <p>目前有以下公共字段: </p>
              <pre>
                <code>type: 只能选 notice, changelog , news , article , wiki 中的一个</code>
              </pre>
              <p>接下来还需要根据不同的类型，继续填写不同的元数据。</p>
              <p>不同类型的文章所需的元数据见下表</p>

              <h3>元数据一览</h3>
              <h4>动态</h4>
              <table>
                <tr>
                  <th>字段</th>
                  <th>类型</th>
                </tr>
                <tr>
                  <td>type</td>
                  <td>notice</td>
                </tr>
              </table>
              <h4>changelog</h4>
              <table>
                <tr>
                  <th>字段</th>
                  <th>类型</th>
                </tr>
                <tr>
                  <td>type</td>
                  <td>changelog</td>
                </tr>
                <tr>
                  <td>version</td>
                  <td>字符串, 格式为: 主版本.副版本.补丁版本</td>
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
              <h3>发布 changelog</h3>
              <p>
                再以发布 changelog 为例，首先填写公共字段 <code>type: changelog</code>，然后我们还需要填写 changelog
                类型的私有字段 version，version 是一个字符串，表示发布 changelog 的游戏版本，官网只允许发布新版本
                changelog 而不能够覆盖旧版本。比如: 数据库中存在的最新版本的 changelog 是 <code>1.1.2</code>
                ，那么你可以发布高于这个版本的任意版本，比如 <code>1.1.3</code>，<code>1.1.4514</code>，
                <code>1.145.14</code>，<code>11.45.14</code>……
              </p>
              <p>
                假定发布的 changelog 版本是 <code>1.1.3</code>，那么我们最终填写的元数据如下
              </p>
              <pre>
                <code>
                  --- <br></br>
                  type: notice<br></br>
                  version: 1.1.3<br></br>
                  ---
                </code>
              </pre>
            </Typography>
          </EditorStyle>
          下面的编辑器与编辑器页面完全相同，快来试试吧
          <ArticleEditor />
        </div>
      </Container>
    </>
  );
}
