/**
 * Created by AshZhang on 15/9/14.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Message from '../src/components/message/Message.jsx';


describe('Message', () => {
  let message;
  const content = 'Test message';

  beforeEach(() => {
    Message(content);
    message = document.getElementById('react-message').firstChild;
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('react-message'));
  });

  it('renders a message', () => {
    expect(message.nodeName).toEqual('DIV');
    expect(message.classList.contains('message')).toBeTruthy();
    expect(message.textContent).toEqual(content);
  });

  it('renders one message only', () => {
    expect(message.textContent).toEqual(content);

    Message('message 2');
    expect(document.getElementById('react-message').children.length).toEqual(1);
    expect(document.getElementById('react-message').firstChild.textContent).toEqual('message 2');
  });
});