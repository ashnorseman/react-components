/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';

import React, { Component } from 'react';


export default class TextArea extends Component {

  render() {

    return (
      <textarea {...this.props}></textarea>
    );
  }
}