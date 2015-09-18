/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import FormControl from '../src/components/form/FormControl.jsx';


describe('FormControl', () => {

  describe('Input', () => {

    it('renders an input text', () => {
      const control = {
        type: 'text',
        name: 'name',
        defaultValue: 'Ash',
        label: 'Name'
      };

      const instance = ReactTestUtils.renderIntoDocument(
        <FormControl {...control}></FormControl>
      );

      const text = React.findDOMNode(instance);

      expect(text.nodeName).toEqual('INPUT');
      expect(text.type).toEqual('text');
      expect(text.name).toEqual('name');
      expect(text.value).toEqual('Ash');
      expect(text.placeholder).toEqual('Name');
    });

    it('renders an input number', () => {
      const control = {
        type: 'number',
        name: 'count',
        defaultValue: 1,
        label: 'Number'
      };

      const instance = ReactTestUtils.renderIntoDocument(
        <FormControl {...control}></FormControl>
      );

      const text = React.findDOMNode(instance);

      expect(text.nodeName).toEqual('INPUT');
      expect(text.type).toEqual('number');
      expect(text.name).toEqual('count');
      expect(text.value).toEqual('1');
      expect(text.placeholder).toEqual('Number');
    });
  });

  describe('Textarea', () => {

    it('renders a textarea', () => {
      const control = {
        type: 'textarea',
        name: 'info',
        defaultValue: '~~~',
        label: 'Anything'
      };

      const instance = ReactTestUtils.renderIntoDocument(
        <FormControl {...control}></FormControl>
      );

      const text = React.findDOMNode(instance);

      expect(text.nodeName).toEqual('TEXTAREA');
      expect(text.name).toEqual('info');
      expect(text.value).toEqual('~~~');
      expect(text.placeholder).toEqual('Anything');
    });
  });

  describe('Select', () => {

    it('renders a select', () => {
      const control = {
        type: 'select',
        name: 'choose',
        defaultValue: '1',
        options: [
          {
            value: 1,
            text: 'Name'
          }
        ]
      };

      const instance = ReactTestUtils.renderIntoDocument(
        <FormControl {...control}></FormControl>
      );

      const text = React.findDOMNode(instance);

      expect(text.nodeName).toEqual('SELECT');
      expect(text.name).toEqual('choose');
      expect(text.value).toEqual('1');
      expect(text.querySelectorAll('option').length).toEqual(1);
    });
  });
});