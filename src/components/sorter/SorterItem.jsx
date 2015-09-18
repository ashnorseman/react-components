/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

import React, { Component } from 'react';


export default class SorterItem extends Component {

  render() {
    const { text, order, active } = this.props;
    const className = 'sorter-item'
                      + (active ? ' active' : '')
                      + (order === -1 ? ' desc' : '');

    return (
      <a className={className} href="javascript:void(0);" {...this.props}>{text}</a>
    );
  }
}