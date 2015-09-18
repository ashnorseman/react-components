/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Table from '../src/components/table/Table.jsx';

describe('Table', () => {
  const header = [
    {
      name: 'changeTime',
      text: '日期'
    },
    {
      name: 'changeRecord',
      text: '变更日期'
    }
  ];

  const rows = [
    {
      changeTime: '2015-09-12',
      changeRecord: '-500'
    },
    {
      changeTime: '2015-09-11',
      changeRecord: '+100'
    }
  ];

  let instance, table;

  beforeEach(() => {
    instance = ReactTestUtils.renderIntoDocument(
      <Table header={header} rows={rows}></Table>
    );
    table = React.findDOMNode(instance);
  });

  it('renders a table element', () => {
    expect(table.nodeName).toEqual('TABLE');
  });

  it('creates thead', () => {
    expect(table.querySelectorAll('th').length).toEqual(2);
    expect(table.querySelectorAll('th')[0].textContent).toEqual('日期');
  });

  it('creates tbody', () => {
    expect(table.querySelectorAll('tbody > tr').length).toEqual(2);
    expect(table.querySelectorAll('tbody > tr')[0].firstElementChild.textContent).toEqual('2015-09-12');
    expect(table.querySelectorAll('tbody > tr')[1].lastElementChild.textContent).toEqual('+100');
  });

  it('creates a table without header', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Table rows={[[1, 2], [3, 4]]}></Table>
    );

    table = React.findDOMNode(instance);

    expect(table.querySelectorAll('tr').length).toEqual(2);
    expect(table.querySelectorAll('td')[0].textContent).toEqual('1');
  });

  it('creates a table without data', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Table header={header}></Table>
    );

    table = React.findDOMNode(instance);

    expect(table.querySelectorAll('tbody > tr').length).toEqual(0);
  });

  it('adds special class names to certain tds', () => {

    function decorateTd(data, header) {
      return header === 'changeRecord'
        ? data.charAt(0) === '+' ? 'text-primary' : 'text-light'
        : '';
    }

    instance = ReactTestUtils.renderIntoDocument(
      <Table header={header} rows={rows} decorateTd={decorateTd}></Table>
    );

    table = React.findDOMNode(instance);

    expect(table.querySelector('.text-light')).not.toEqual(null);
    expect(table.querySelector('.text-light').textContent).toEqual('-500');

    expect(table.querySelector('.text-primary')).not.toEqual(null);
    expect(table.querySelector('.text-primary').textContent).toEqual('+100');
  });
});