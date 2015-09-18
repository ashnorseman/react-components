/**
 * Created by AshZhang on 15/9/11.
 */


'use strict';

import '../node_modules/normalize.css/normalize.css';
import './common/styles/global.less';

import React from 'react';
import Table from './components/table/Table.jsx';
import Tab from '../src/components/tab/Tab.jsx';
import Sorter from '../src/components/sorter/Sorter.jsx';
import Message from '../src/components/message/Message.jsx';
import Form from '../src/components/form/Form.jsx';
import ajax from '../src/common/utils/ajax';


const header = [
  {
    name: 'changeTime',
    text: '日期'
  },
  {
    name: 'changeRecord',
    text: '变更日期'
  }
];

const rows = [
  {
    changeTime: '2015-09-12',
    changeRecord: '-500'
  },
  {
    changeTime: '2015-09-11',
    changeRecord: '+100'
  },
  {
    changeTime: '2015-09-10',
    changeRecord: '+200'
  },
  {
    changeTime: '2015-09-09',
    changeRecord: '+300'
  }
];


/**
 * 根据数据，为 td 添加特殊的样式
 * @param {string} data 数据内容
 * @param {string} header 表头的 name 属性
 * @returns {string} 样式名称
 */
function decorateTd(data, header) {
  return header === 'changeRecord'
            ? data.charAt(0) === '+' ? 'text-primary' : 'text-light'
            : '';
}


//React.render(
//  <Table header={header} rows={rows} decorateTd={decorateTd}></Table>,
//  document.body
//);


const tabMenu = [
  {
    text: '积分明细',
    active: true,
    component: <div>1</div>
  },
  {
    text: '兑礼信息',
    component: <div>2</div>
  },
  {
    text: '收货地址',
    component: <div>3</div>
  }
];


//React.render(
//  <Tab menu={tabMenu}></Tab>,
//  document.body
//);


const data = [
  {
    text: '热度排序',
    name: 'hot',
    order: -1,
    active: true
  },
  {
    text: '积分排序',
    name: 'points',
    order: 1
  },
  {
    text: '上架时间',
    name: 'createTime',
    order: -1
  }
];


function onSort({ name, order }) {
  console.log(name, order);
}


//React.render(
//  <Sorter menu={data} onSort={onSort}></Sorter>,
//  document.body
//);


//Message('Test Message', 1000);
//
//setTimeout(() => {
//  Message('Test Message 2', 1000);
//}, 1000);
//
//setTimeout(() => {
//  Message('Test Message 3', 1000);
//}, 500);


const formControls = [
  {
    label: '收货人',
    name: 'name',
    type: 'text',
    tips: '必填，最多 5 字，最少 1 字',
    defaultValue: 'Ash',
    autoComplete: false,
    required: true,
    maxLength: 5,
    minLength: 1,
    onChange(e) {
      console.log(e.target.value);
    }
  },
  {
    label: '联系方式',
    name: 'tel',
    type: 'text',
    tips: '必填，手机或固话',
    defaultValue: '180',
    autoComplete: false,
    required: true,
    onChange(e) {
      console.log(e.target.value);
    }
  },
  {
    label: '省',
    name: 'province',
    type: 'select',
    tips: '必填',
    required: true,
    defaultValue: 1,
    options: [
      {
        value: '',
        text: '请选择省'
      },
      {
        value: '1',
        text: '上海'
      }
    ],
    onChange(e) {
      console.log(e.target.value);
    }
  },
  {
    label: '详细地址',
    name: 'address',
    type: 'textarea',
    tips: '必填，最多 50 字',
    defaultValue: '1',
    required: true
  },
  {
    label: '照片',
    name: 'photo',
    type: 'file',
    tips: '最多 1 M'
  }
];

const formSubmit = {
  text: '保存'
};


React.render(
  <Form name='ash-form' id='ash-form' action='//localhost:9090/ash'
        controls={formControls} submit={formSubmit}></Form>,
  document.body
);