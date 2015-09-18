/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';

import React, { Component } from 'react';

import Input from './Input.jsx';
import TextArea from './TextArea.jsx';
import Select from './Select.jsx';


const controlTypeMap = {
  text: Input,
  number: Input,
  file: Input,
  textarea: TextArea,
  select: Select
};


export default class FormControl extends Component {

  constructor(props) {
    super(props);

    const form = this.props.form;

    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);

    if (form) {
      form.controls || (form.controls = []);
      form.controls.push(this);
    }
  }

  render() {
    const { label, type, valid, form, name, ...attr } = this.props;
    const validClassName = valid === void 0 ? '' : valid ? 'form-valid' : 'form-invalid';
    const Control = controlTypeMap[type];

    const placeholder = (label !== void 0) ? label : '';

    return (
      Control
        ? <Control type={type} {...attr} name={name} id={name}
                               onChange={this.onChange}
                               className={validClassName}
                               placeholder={placeholder}></Control>
        : null
    );
  }

  onChange(e) {
    this.isValid(e.target.value);

    if (typeof this.props.onChange === 'function') {
      this.props.onChange.call(this, e);
    }
  }

  isValid(value) {
    const formLine = this.props.formLine;
    let valid;

    if (!value) {
      value = React.findDOMNode(this).value;
    }

    // Don't validate empty inputs
    if (!value && !this.props.required) valid = true;

    else if (!value && this.props.required) valid = false;

    else if (this.props.maxLength !== void 0 && value.length > this.props.maxLength) valid = false;

    else if (this.props.minLength !== void 0 && value.length < this.props.minLength) valid = false;

    else if (this.props.max !== void 0 && +value > this.props.max) valid = false;

    else if (this.props.min !== void 0 && +value < this.props.min) valid = false;

    else if (this.props.pattern !== void 0 && !(new RegExp(this.props.pattern).test(value))) valid = false;

    else valid = true;

    if (formLine) {
      formLine.setState({
        empty: value === '',
        valid: valid
      });
    }

    return valid;
  }
}