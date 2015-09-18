/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

import React, { Component } from 'react';


export default class TabItem extends Component {

  render() {
    const { active, text, onClick } = this.props;
    const className = 'tab-item' + (active ? ' active' : '');

    return (
      <a className={className} href='javascript:void(0);' onClick={onClick}>{text}</a>
    );
  }
}