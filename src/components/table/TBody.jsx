/**
 * Created by AshZhang on 15/9/11.
 */


'use strict';

import React, { Component } from 'react';
import Tr from './Tr.jsx';


export default class TBody extends Component {

  render() {
    const { header, rows } = this.props;

    return (
      <tbody>
        {
          rows
            ? rows.map((row, index) => {
                return <Tr key={index} data={row} {...this.props}></Tr>;
              })
            : null
        }
      </tbody>
    );
  }
}