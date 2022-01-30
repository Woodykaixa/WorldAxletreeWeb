import { Container, ImageWall } from '@/components';
import Head from 'next/head';
import { Typography } from 'antd';
import { CopyOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

export default function ImageWallHelp() {
  return (
    <>
      <Head>
        <title>图片库使用说明</title>
      </Head>
      <Container>
        <div className='p-20'>
          <Typography>
            <p>图片库是官网的图片管理平台，你可以在图片库中上传图片，然后复制图片链接，以便添加在 Markdown 中。</p>
            <p>
              点击
              <div className='inline-flex flex-col items-center justify-center bg-gray-700 w-[50px] h-[50px] mx-2'>
                <PlusOutlined /> Upload
              </div>
              按钮即可上传图片。目前一次只支持上传一张图片，上传多张图片需要多次点击上传按钮。
            </p>
            <p>对于已经上传完成的图片，将鼠标移动到图片上会显示三个按钮: </p>
            <p>
              <CopyOutlined />: 复制图片链接
            </p>
            <p>
              <EyeOutlined />: 预览图片
            </p>
            <p>
              <DeleteOutlined />: 删除图片
            </p>
            <p>
              点击复制链接按钮会将图片链接复制到剪贴板，这个设计的理由是假定此时你正在编辑器编辑内容，并有插入图片的需求。
            </p>
            <p>因为图片库中显示的是图片的缩略图，因此设计了预览按钮，点击后可以查看原始图片。</p>
            <p>
              如果上传了一张不想要的图片，可以点击删除按钮将其删除。或是在官网的内容更新后删除不再使用的旧图片。但需要注意的是，
              官网上的所有文章都没有检测引用哪些图片。也就是说，系统无法确保你正在删除的图片没有在文章中使用。
              如果删除了一张还在被使用的图片，那么该文章中被引用的图片会加载失败，其他内容照常显示。
            </p>
            <p className='text-red-500'>
              <b>注意：图片库没有类似回收站或历史记录的功能，图片在数据库中删除就真的删除了，无法找回。</b>
            </p>
          </Typography>
          下面的图片库与图片库页面完全相同，快来试试吧
          <ImageWall className='border-2 border-gray-600' />
        </div>
      </Container>
    </>
  );
}
