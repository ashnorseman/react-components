/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

import './styles/tab.less';

import React, { Component } from 'react';
import TabItem from './TabItem.jsx';


export default class Tab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: this.props.menu || []
    };
  }

  render() {
    const { menu } = this.state;
    const activeMenu = menu.filter((menuItem) => {
      return menuItem.active;
    })[0];
    const activeComponent = activeMenu ? activeMenu.component : null;

    return (
      <section>
        <nav className='tab'>
          {
            menu.map((menuItem, index) => {
              return <TabItem key={index} {...menuItem}
                              onClick={this.activateMenu.bind(this, index)}>{menuItem.text}</TabItem>;
            })
          }
        </nav>
        <div ref='tabContent'>{activeComponent}</div>
      </section>
    );
  }


  /**
   * Activate a menu item
   * @param {number} activeIndex
   */
  activateMenu(activeIndex) {
    const menu = this.state.menu;

    menu.forEach((menuItem, index) => {
      menuItem.active = (activeIndex === index);
    });

    this.setState({
      menu: menu
    });
  }
}