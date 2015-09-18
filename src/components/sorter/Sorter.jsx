/**
 * Created by AshZhang on 15/9/13.
 */


'use strict';

import './styles/sorter.less';

import React, { Component } from 'react';
import SorterItem from './SorterItem.jsx';


export default class Sorter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: this.props.menu || []
    };
  }


  /**
   * Initial sort
   */
  componentDidMount() {
    const active = this.state.menu.filter((menuItem) => {
      return menuItem.active;
    })[0];

    if (active && typeof this.props.onSort === 'function') {
      this.props.onSort.call(null, active);
    }
  }

  render() {
    const { menu } = this.state;

    return (
      <nav className='sorter'>
        {
          menu.map((menuItem, index) => {
            return <SorterItem key={index} {...menuItem} onClick={this.reSort.bind(this, index)}></SorterItem>;
          })
        }
      </nav>
    );
  }


  /**
   * Resort by index
   * - if the item is active, change its sort order
   * - else set it active
   * @param {number} index
   */
  reSort(index) {
    const menu = this.state.menu;

    if (menu[index].active) {
      menu[index].order *= -1;
    } else {
      this.state.menu.forEach((menuItem, itemIndex) => {
        menuItem.active = (itemIndex === index);
      });
    }

    this.setState({ menu });

    // Triggers `onSort` callback
    if (typeof this.props.onSort === 'function') {
      this.props.onSort.call(null, menu[index]);
    }
  }
}