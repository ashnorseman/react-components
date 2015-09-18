/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Tab from '../src/components/tab/Tab.jsx';


describe('Tab', () => {
  const data = [
    {
      text: '积分明细',
      active: true,
      component: <div>1</div>
    },
    {
      text: '兑礼信息',
      component: <div>2</div>
    },
    {
      text: '收货地址',
      component: <div>3</div>
    }
  ];

  let instance, tab, tabMenu, tabContent;

  beforeEach(() => {
    instance = ReactTestUtils.renderIntoDocument(
      <Tab menu={data}></Tab>
    );
    tab = React.findDOMNode(instance);
    tabMenu = tab.firstChild;
    tabContent = tab.lastChild;
  });

  it('renders a tab menu', () => {
    expect(tabMenu.nodeName).toEqual('NAV');
    expect(tabMenu.className).toEqual('tab');
  });

  it('renders menu items', () => {
    expect(tabMenu.querySelectorAll('a').length).toEqual(3);
    expect(tabMenu.querySelector('a').classList.contains('tab-item')).toBeTruthy();
    expect(tabMenu.querySelector('a').textContent).toEqual('积分明细');
  });

  it('renders active menu items', () => {
    expect(tabMenu.querySelector('a').classList.contains('active')).toBeTruthy();
  });

  it('renders active component', () => {
    expect(tabContent.nodeName).toEqual('DIV');
    expect(tabContent.firstChild.textContent).toEqual('1');
  });

  it('activates another menu item', () => {
    ReactTestUtils.Simulate.click(tabMenu.querySelectorAll('a')[1]);
    expect(tabMenu.querySelectorAll('a')[0].classList.contains('active')).toBeFalsy();
    expect(tabMenu.querySelectorAll('a')[1].classList.contains('active')).toBeTruthy();
    expect(tabContent.firstChild.textContent).toEqual('2');
  });
});