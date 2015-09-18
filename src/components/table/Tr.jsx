/**
 * Created by AshZhang on 15/9/11.
 */


'use strict';

import React, { Component } from 'react';


export default class Tr extends Component {

  render() {
    const { header, data, decorateTd } = this.props;
    let tds;

    if (header) {
      tds = header.map((header, index) => {
        const tdData = data[header.name];
        return <td className={typeof decorateTd === 'function' ? decorateTd(tdData, header.name) : null}
                   key={index}>{tdData}</td>;
      });
    } else {
      tds = data.map((tdData, index) => {
        return <td className={typeof decorateTd === 'function' ? decorateTd(tdData) : null}
                   key={index}>{tdData}</td>;
      });
    }

    return (
      <tr>{tds}</tr>
    );
  }
}