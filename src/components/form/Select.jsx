/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';

import React, { Component } from 'react';


export default class Select extends Component {

  render() {
    const options = this.props.options;

    return (
      <select {...this.props}>
        {
          options.map((option, index) => {
            return <option value={option.value} key={index}>{option.text}</option>;
          })
        }
      </select>
    );
  }
}