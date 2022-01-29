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
        <EditorStyle>
          <Typography>
            <div className='p-20'>
              编辑器支持标准 Markdown 语法、GitHub Flavored Markdown 扩展语法、frontmatter 扩展语法、footnotes
              扩展语法。 通常来说已经满足使用需求，如果仍有其他语法需求可以联系我添加插件。 编辑器布局很简单
              <div className='flex flex-col'>
                <div className='w-full text-center items-center p-4 bg-[#252526] border-[#3c3c3c] border-2 '>
                  功能区
                </div>
                <div className='w-full flex flex-row'>
                  <div className='w-1/2 bg-[#1e1e1e] px-8 py-20 border-[#3c3c3c] border-2 border-r-0'>编辑器</div>
                  <div className='w-1/2 bg-[#1d1d1d] px-8 py-20 border-[#3c3c3c] border-l-white border-2'>预览区</div>
                </div>
              </div>
              编辑器就是我们用来编辑文章的区域，编辑后会实时渲染在右侧预览区。这两个区域很简单，所以下面重点介绍功能区
              功能区左侧是 Markdown 语法的快捷键，当你不熟悉 Markdown
              语法时，可以用鼠标单击这些快捷键，会在光标位置插入相应的 Markdown 代码。 比如左功能区第三个按钮：
              <svg width='1em' height='1em' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M20 6h16M12 42h16M29 5.952 19 42'
                  stroke='currentColor'
                  strokeWidth='4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              单击这个按钮，则会在光标位置语句的前后方插入 `*`，同时右侧预览区域可以看到该语句变为斜体。
              大多数按钮只是基本的语法按钮。有两个需要特别注意，则是左功能区的最后两个按钮。
              <FileImageOutlined /> 是照片库按钮，点击后可以打开照片库对话框，其功能与
              <Link href='/admin/help/image'>照片库页面</Link>完全一致。
              <br></br>
              <UploadOutlined className='text-red-500' /> 是上传按钮。我们使用前文提到的 frontmatter
              语法来识别文章类型。不同的文章类型拥有不同的上传行为。
              你只需要填写几行固定格式的元数据，剩下的交给编辑器即可。 下面介绍 frontmatter 语法。以 `---`
              开头和结尾，以 `key: value` 的形式来输入元数据，且至少要包含以下字段
              <br></br>
              ``` type：只能选`notice`, `changelog`, `news`, `article`, `wiki`中的一个 ```
              <br></br>
              对于 `type: notice` 类型的文章，现在已经可以点击上传按钮发布了。这个类型的文章会被发布到
              <Link href='/notice'>动态栏</Link>
              其余类型，我还没做，做完了再写。
            </div>
          </Typography>
        </EditorStyle>
        下面的编辑器与编辑器页面完全相同，快来试试吧
        <ArticleEditor />
      </Container>
    </>
  );
}
