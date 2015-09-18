/**
 * Created by AshZhang on 15/9/11.
 */


'use strict';

import React, { Component } from 'react';


export default class THead extends Component {

  render() {
    const { header } = this.props;

    return (
      <thead>
        <tr>
          {
            header.map((header, index) => {
              return <th key={index}>{header.text}</th>;
            })
          }
        </tr>
      </thead>
    );
  }
}