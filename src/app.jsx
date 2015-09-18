/**
 * Created by AshZhang on 15/9/11.
 */


'use strict';

import '../node_modules/normalize.css/normalize.css';

import React, { Component } from 'react';
import Router, { Route, Redirect, RouteHandler } from 'react-router';
import Form from './components/form/Form.jsx';
import Message from './components/message/Message.jsx';


// Weixin
// ---------------------------

//wx.config({
//  debug: true,
//  appId: 'wx830723309171d417',
//  timestamp: 0,
//  nonceStr: '',
//  signature: '',
//  jsApiList: []
//});


// APP
// ---------------------------

/**
 * App entry
 */
class App extends Component {

  render() {

    return (
      <div className='page'></div>
    );
  }
}


// Routes
// ---------------------------

const routes = (
  <Route handler={App}>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('app'));
});


// Test
// ---------------------------

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
  <Form name='ash-form' id='ash-form' action='//whaleplayer.com/form-test'
        controls={formControls} submit={formSubmit}></Form>,
  document.body
);