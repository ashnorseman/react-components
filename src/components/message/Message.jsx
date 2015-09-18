/**
 * Created by AshZhang on 15/9/14.
 */


'use strict';

import './styles/message.less';

import React, { Component } from 'react';

let messageInstance;
const TRANSITION_DURATION = 300;


class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };
  }

  componentDidMount() {
    const message = React.findDOMNode(this);
    const wW = document.documentElement.clientWidth;
    const wH = document.documentElement.clientHeight;

    message.style.left = (wW - message.clientWidth) / 2 + 'px';
    message.style.top = (wH - message.clientHeight) / 2 + 'px';

    this._init = setTimeout(() => {
      this.setState({
        opened: true
      });
    }, 0);

    this._close = setTimeout(() => {
      this.setState({
        opened: false
      });
    }, this.props.durationMS);

    this._unmount = setTimeout(() => {
      this.destroy();
    }, this.props.durationMS + TRANSITION_DURATION);
  }

  render() {
    const { opened } = this.state;
    const className = 'message'
                      + (opened ? ' opened' : '');

    return (
      <div className={className}>{this.props.text}</div>
    );
  }


  /**
   * Clear all timeouts and unmount the component
   */
  destroy() {
    const holder = document.getElementById('react-message');

    clearTimeout(this._init);
    clearTimeout(this._close);
    clearTimeout(this._unmount);

    React.unmountComponentAtNode(React.findDOMNode(this).parentNode);
  }
}

export default function (text, durationMS = 1000) {
  let holder = document.getElementById('react-message');

  if (!holder) {
    holder = document.createElement('div');
    holder.id = 'react-message';
    document.body.appendChild(holder);
  }

  if (holder.firstElementChild) {
    messageInstance.destroy();
  }

  messageInstance = React.render(
    <Message text={text} durationMS={durationMS}></Message>,
    holder
  );
}