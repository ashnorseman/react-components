/**
 * Created by AshZhang on 15/9/11.
 */


'use strict';

import './styles/table.less';

import React, { Component } from 'react';
import THead from './THead.jsx';
import TBody from './TBody.jsx';


export default class Table extends Component {

  render() {
    const { header } = this.props;

    return (
      <table>
        { header ? <THead header={header}></THead> : null}
        <TBody {...this.props}></TBody>
      </table>
    );
  }
}