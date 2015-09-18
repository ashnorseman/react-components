/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';

import React, { Component } from 'react';

import FormControl from './FormControl.jsx';


export default class FormLine extends Component {

  constructor(props) {
    super(props);

    this.state = {
      empty: this.props.defaultValue === void 0
    };
  }

  render() {
    const { label, tips, form, ...attr } = this.props;
    const valid = this.state.valid;
    const className = 'form-line' +
                        (this.state.empty ? ' form-empty' : ' form-dirty') +
                        (valid === void 0 ? '' : valid ? ' form-valid' : ' form-invalid');

    return (
      <div className={className}>
        <FormControl formLine={this} form={form} valid={this.state.valid} {...attr}></FormControl>
        {
          label !== void 0
            ? <div className='form-label'>{label}
                {tips ? <span className='form-tips'>（{tips}）</span> : null}
              </div>
            : null
        }
        <div className='form-control-border'></div>
      </div>
    );
  }
}