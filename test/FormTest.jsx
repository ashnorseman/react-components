/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Form from '../src/components/form/Form.jsx';


describe('Form', () => {
  const formControls = [
    {
      label: '收货人',
      name: 'name',
      type: 'text',
      tips: '必填，最多 5 字，最少 1 字',
      required: true,
      maxLength: 10,
      minLength: 2
    },
    {
      label: '数量',
      name: 'count',
      type: 'number',
      tips: '必填',
      required: true,
      max: 10,
      min: 2
    },
    {
      label: '说明',
      name: 'info',
      type: 'textarea',
      tips: '小写字母',
      pattern: '^[a-z]+$'
    }
  ];

  const formSubmit = {
    text: '保存'
  };

  let instance, form;

  beforeEach(() => {
    instance = ReactTestUtils.renderIntoDocument(
      <Form controls={formControls} submit={formSubmit}></Form>
    );
    form = React.findDOMNode(instance);
  });

  it('renders a form', () => {
    expect(form.nodeName).toEqual('FORM');
  });

  it('renders form lines', () => {
    expect(form.querySelectorAll('.form-line').length).toEqual(3);
  });

  it('renders form labels', () => {
    expect(form.querySelectorAll('.form-line > .form-label').length).toEqual(3);
  });

  it('renders form controls', () => {
    expect(form.querySelectorAll('[type=text]').length).toEqual(1);
    expect(form.querySelectorAll('textarea').length).toEqual(1);
    expect(form.querySelectorAll('[type=number]').length).toEqual(1);
  });

  it('renders form submit', () => {
    expect(form.querySelectorAll('.form-submit').length).toEqual(1);
    expect(form.querySelector('button').textContent).toEqual('保存');
  });

  describe('Validation', () => {
    let name, count, info;

    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(
        <Form controls={formControls} submit={formSubmit}></Form>
      );
      form = React.findDOMNode(instance);

      name = form.querySelector('[name=name]');
      count = form.querySelector('[name=count]');
      info = form.querySelector('[name=info]');
    });

    it('validates on change', () => {
      expect(name.parentNode.classList.contains('form-invalid')).toBeFalsy();

      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeTruthy();

      name.value = '11111';
      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeFalsy();
      expect(name.parentNode.classList.contains('form-valid')).toBeTruthy();

      name.value = '11111-11111';
      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(name.parentNode.classList.contains('form-valid')).toBeFalsy();
    });

    it('validates required', () => {
      expect(name.parentNode.classList.contains('form-invalid')).toBeFalsy();

      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(name.parentNode.classList.contains('form-valid')).toBeFalsy();

      name.value = '11111';
      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeFalsy();
      expect(name.parentNode.classList.contains('form-valid')).toBeTruthy();
    });

    it('validates maxLength & minLength', () => {
      name.value = '11111';
      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeFalsy();
      expect(name.parentNode.classList.contains('form-valid')).toBeTruthy();

      name.value = '1';
      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(name.parentNode.classList.contains('form-valid')).toBeFalsy();

      name.value = '11111-11111';
      ReactTestUtils.Simulate.change(name);
      expect(name.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(name.parentNode.classList.contains('form-valid')).toBeFalsy();
    });

    it('validates max & min', () => {
      count.value = '5';
      ReactTestUtils.Simulate.change(count);
      expect(count.parentNode.classList.contains('form-invalid')).toBeFalsy();
      expect(count.parentNode.classList.contains('form-valid')).toBeTruthy();

      count.value = '1';
      ReactTestUtils.Simulate.change(count);
      expect(count.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(count.parentNode.classList.contains('form-valid')).toBeFalsy();

      count.value = '20';
      ReactTestUtils.Simulate.change(count);
      expect(count.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(count.parentNode.classList.contains('form-valid')).toBeFalsy();
    });

    it('validates pattern', () => {
      info.value = 'abc';
      ReactTestUtils.Simulate.change(info);
      expect(info.parentNode.classList.contains('form-invalid')).toBeFalsy();
      expect(info.parentNode.classList.contains('form-valid')).toBeTruthy();

      info.value = 'ABC';
      ReactTestUtils.Simulate.change(info);
      expect(info.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(info.parentNode.classList.contains('form-valid')).toBeFalsy();

      info.value = 'abc';
      ReactTestUtils.Simulate.change(info);
      expect(info.parentNode.classList.contains('form-invalid')).toBeFalsy();
      expect(info.parentNode.classList.contains('form-valid')).toBeTruthy();
    });

    it('validates before submit', () => {
      ReactTestUtils.Simulate.submit(form);
      expect(name.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(count.parentNode.classList.contains('form-invalid')).toBeTruthy();
      expect(info.parentNode.classList.contains('form-invalid')).toBeFalsy();
    });
  });
});