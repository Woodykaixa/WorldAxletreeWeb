import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd';
import { Card, Slider, Rate } from 'antd';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
});

export const EditorForm = () => {
  const form = useMemo(() => createForm(), []);

  return (
    <Form form={form} labelCol={6} wrapperCol={12}>
      <SchemaField>
        <SchemaField.String
          title='标题'
          x-decorator='FormItem'
          x-component='Input'
          x-validator={[]}
          name='title'
          required={true}
          x-index={0}
        />
        <SchemaField.Markup
          title='发布类型'
          x-decorator='FormItem'
          x-component='Select'
          x-validator={[]}
          name='type'
          enum={[
            { children: [], label: '文章', value: 'article' },
            { children: [], label: '百科', value: 'wiki' },
            { children: [], label: '资讯', value: 'news' },
            { children: [], label: '通知', value: 'notice' },
          ]}
          required={true}
          x-index={1}
        />
        <SchemaField.Markup
          title='发布方式'
          x-decorator='FormItem'
          x-component='Select'
          x-validator={[]}
          name='action'
          description=''
          enum={[
            { children: [], label: '新发布', value: 'new' },
            { children: [], label: '更新', value: 'update' },
          ]}
          x-reactions={{
            dependencies: [{ property: 'value', type: 'any', source: 'type', name: 'type' }],
            fulfill: {
              state: {
                visible: "{{['article', 'wiki'].includes($deps.type)}}",
              },
            },
          }}
          required={true}
          x-index={2}
        />
        <SchemaField.String
          title='作者'
          x-decorator='FormItem'
          x-component='Input'
          x-validator={[]}
          description=''
          name='author'
          required={true}
          x-reactions={{
            dependencies: [{ property: 'value', type: 'any', source: 'type', name: 'type' }],
            fulfill: { state: { visible: "{{$deps.type === 'article'}}" } },
          }}
          x-index={3}
        />
        <SchemaField.Markup
          title='关键词'
          x-decorator='FormItem'
          x-component='Select'
          x-validator={[]}
          x-component-props={{
            allowClear: true,
            showSearch: false,
            labelInValue: false,
            mode: 'tags',
          }}
          name='keywords'
          x-reactions={{
            dependencies: [{ property: 'value', type: 'any', source: 'type', name: 'type' }],
            fulfill: { state: { visible: "{{$deps.type === 'article'}}" } },
          }}
          x-index={4}
        />
        <SchemaField.String
          title='封面图链接'
          x-decorator='FormItem'
          x-component='Input'
          x-validator='url'
          name='cover'
          description='http或https开头的图片链接'
          x-reactions={{
            dependencies: [{ property: 'value', type: 'any', source: 'type', name: 'type' }],
            fulfill: { state: { visible: "{{$deps.type === 'news'}}" } },
          }}
          x-index={5}
        />
        <SchemaField.Markup
          title='百科类型'
          x-decorator='FormItem'
          x-component='Select'
          x-validator={[]}
          name='kind'
          x-reactions={{
            dependencies: [{ property: 'value', type: 'any', source: 'type', name: 'type' }],
            fulfill: { state: { visible: "{{$deps.type === 'wiki'}}" } },
          }}
          enum={[
            { children: [], label: '建筑物', value: 'Building' },
            { children: [], label: '单位', value: 'Unit' },
            { children: [], label: '支援技能', value: 'Support' },
          ]}
          x-index={6}
          required={true}
        />
        <SchemaField.Markup
          title='阵营'
          x-decorator='FormItem'
          x-component='Select'
          x-validator={[]}
          name='side'
          x-reactions={{
            dependencies: [{ property: 'value', type: 'any', source: 'type', name: 'type' }],
            fulfill: { state: { visible: "{{$deps.type === 'wiki'}}" } },
          }}
          enum={[
            { children: [], label: '北美', value: 'NACSF ' },
            { children: [], label: '独联体', value: 'CISUF' },
            { children: [], label: '虹', value: 'RITC' },
            { children: [], label: '欧洲联邦', value: 'EFRRF' },
            { children: [], label: '远东', value: 'FECO' },
          ]}
          x-index={7}
          required={true}
        />
        <SchemaField.Number
          title='科技等级'
          x-decorator='FormItem'
          x-component='NumberPicker'
          x-validator={[]}
          x-component-props={{ min: 0 }}
          name='order'
          description=''
          x-reactions={{
            dependencies: [{ property: 'value', type: 'any', source: 'type', name: 'type' }],
            fulfill: { state: { visible: "{{$deps.type === 'wiki'}}" } },
          }}
          required={true}
          x-index={8}
        />
        <SchemaField.String
          title='正文'
          x-decorator='FormItem'
          x-component='Input.TextArea'
          x-validator={[]}
          x-component-props={{
            showCount: true,
            maxLength: null,
            style: { height: 'inherit' },
            autoSize: { maxRows: 15, minRows: 7 },
          }}
          name='text'
          required={true}
          x-index={9}
        />
      </SchemaField>
    </Form>
  );
};
