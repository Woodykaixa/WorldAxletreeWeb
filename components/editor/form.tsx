import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Button } from 'antd';
import { Editor } from '@bytemd/react';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { EditorStyle, upload, consumeMeta, modal } from '@/components/editor';
import gfm from '@bytemd/plugin-gfm';
import gfmZh from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import { MarkdownEditor } from './md-editor';
export const EditorForm = () => {
  const [type, setType] = useState<string>();
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      onFinish={e => {
        console.log(e);
      }}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label='发布类型' name='type' rules={[{ required: true }]}>
        <Select value={type} onChange={value => setType(value)}>
          <Select.Option value='article'>文章</Select.Option>
          <Select.Option value='wiki'>百科</Select.Option>
          <Select.Option value='news'>资讯</Select.Option>
          <Select.Option value='notice'>通知</Select.Option>
        </Select>
      </Form.Item>
      {['article', 'wiki'].includes(type ?? '') && (
        <Form.Item label='发布方式' name='action' rules={[{ required: true }]}>
          <Select>
            <Select.Option value='new'>新发布</Select.Option>
            <Select.Option value='update'>更新</Select.Option>
          </Select>
        </Form.Item>
      )}
      {type === 'article' && (
        <>
          <Form.Item label='作者' name='author' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label='关键词' name='keywords' initialValue={[]}>
            <Select mode='tags' />
          </Form.Item>
        </>
      )}
      {type === 'news' && (
        <>
          <Form.Item label='封面图链接' name='cover' rules={[{ type: 'url' }]}>
            <Input />
          </Form.Item>
        </>
      )}
      {type === 'wiki' && (
        <>
          <Form.Item label='百科类型' name='kind' rules={[{ required: true }]}>
            <Select>
              <Select.Option value='Building'>建筑物</Select.Option>
              <Select.Option value='Unit'>单位</Select.Option>
              <Select.Option value='Support'>支援技能</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='阵营' name='side' rules={[{ required: true }]}>
            <Select>
              <Select.Option value='NACSF'>北美</Select.Option>
              <Select.Option value='CISUF'>独联体</Select.Option>
              <Select.Option value='RITC'>虹</Select.Option>
              <Select.Option value='EFRRF'>欧洲联邦</Select.Option>
              <Select.Option value='FECO'>远东</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='科技等级' name='order' rules={[{ required: true }]}>
            <InputNumber min={1} max={10} />
          </Form.Item>
        </>
      )}
      <Form.Item wrapperCol={{ span: 22, offset: 1 }} name='text' rules={[{ required: true }]} initialValue=''>
        <MarkdownEditor />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 4, offset: 20 }}>
        <Button htmlType='submit' type='primary'>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
