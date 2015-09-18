/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';


import React, { Component } from 'react';


export default class Button extends Component {

  render() {
    const { text } = this.props;

    return (
      <button {...this.props}>{text}</button>
    );
  }
}