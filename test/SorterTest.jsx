/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Sorter from '../src/components/sorter/Sorter.jsx';


describe('Sorter', () => {
  let data, instance, sorter, onSort;

  beforeEach(() => {
    data = [
      {
        text: '热度排序',
        name: 'hot',
        order: -1,
        active: true
      },
      {
        text: '积分排序',
        name: 'points',
        order: 1
      },
      {
        text: '上架时间',
        name: 'createTime',
        order: -1
      }
    ];
    onSort = jasmine.createSpy('onSort');
    instance = ReactTestUtils.renderIntoDocument(
      <Sorter menu={data} onSort={onSort}></Sorter>
    );
    sorter = React.findDOMNode(instance);
  });

  it('renders a sorter', () => {
    expect(sorter.nodeName).toEqual('NAV');
    expect(sorter.classList.contains('sorter')).toBeTruthy();
  });

  it('renders sorter menus', () => {
    expect(sorter.querySelectorAll('a').length).toEqual(3);
    expect(sorter.querySelectorAll('a')[0].textContent).toEqual('热度排序');
  });

  it('renders class names by active and order', () => {
    const items = sorter.querySelectorAll('a');

    expect(items[0].classList.contains('active')).toBeTruthy();
    expect(items[0].classList.contains('desc')).toBeTruthy();
    expect(items[1].classList.contains('active')).toBeFalsy();
    expect(items[1].classList.contains('desc')).toBeFalsy();
    expect(items[2].classList.contains('active')).toBeFalsy();
    expect(items[2].classList.contains('desc')).toBeTruthy();
  });

  it('clicks on an active item to change order', () => {
    const items = sorter.querySelectorAll('a');

    ReactTestUtils.Simulate.click(items[0]);
    expect(items[0].classList.contains('active')).toBeTruthy();
    expect(items[0].classList.contains('desc')).toBeFalsy();

    ReactTestUtils.Simulate.click(items[0]);
    expect(items[0].classList.contains('active')).toBeTruthy();
    expect(items[0].classList.contains('desc')).toBeTruthy();
  });

  it('clicks on an inactive item to sort it', () => {
    const items = sorter.querySelectorAll('a');

    ReactTestUtils.Simulate.click(items[1]);
    expect(items[1].classList.contains('active')).toBeTruthy();
    expect(items[0].classList.contains('active')).toBeFalsy();

    ReactTestUtils.Simulate.click(items[1]);
    expect(items[1].classList.contains('active')).toBeTruthy();
    expect(items[1].classList.contains('desc')).toBeTruthy();
  });

  it('triggers initial sorter callback', () => {
    const onSort = jasmine.createSpy('onSort');

    instance = ReactTestUtils.renderIntoDocument(
      <Sorter menu={data} onSort={onSort}></Sorter>
    );
    sorter = React.findDOMNode(instance);

    expect(onSort.calls.count()).toEqual(1);
    expect(onSort.calls.first().args[0].name).toEqual('hot');
    expect(onSort.calls.first().args[0].order).toEqual(-1);
  });

  it('triggers sorter callback when an item is clicked', () => {
    const items = sorter.querySelectorAll('a');

    expect(onSort.calls.count()).toEqual(1);

    ReactTestUtils.Simulate.click(items[0]);
    expect(onSort.calls.count()).toEqual(2);
    expect(onSort.calls.mostRecent().args[0].name).toEqual('hot');
    expect(onSort.calls.mostRecent().args[0].order).toEqual(1);

    ReactTestUtils.Simulate.click(items[0]);
    expect(onSort.calls.count()).toEqual(3);
    expect(onSort.calls.mostRecent().args[0].name).toEqual('hot');
    expect(onSort.calls.mostRecent().args[0].order).toEqual(-1);

    ReactTestUtils.Simulate.click(items[1]);
    expect(onSort.calls.count()).toEqual(4);
    expect(onSort.calls.mostRecent().args[0].name).toEqual('points');
    expect(onSort.calls.mostRecent().args[0].order).toEqual(1);
  });
});