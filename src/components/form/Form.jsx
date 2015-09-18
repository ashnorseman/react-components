/**
 * Created by AshZhang on 15/9/16.
 */


'use strict';

import './styles/form.less';

import React, { Component } from 'react';

import Message from '../message/Message.jsx';
import FormLine from './FormLine.jsx';
import Button from './Button.jsx';
import ajax from '../../common/utils/ajax';


export default class Form extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.getFormData = this.getFormData.bind(this);

    this.state = {
      disabled: false
    };
  }

  render() {
    const { controls, submit, ...attr } = this.props;

    return(
      <form onSubmit={this.onSubmit.bind(this)} {...attr}>
        {
          controls && controls.map((control, index) => {
            return (
              <FormLine key={index} {...control} form={this}></FormLine>
            );
          })
        }
        {
          submit
            ? <div className='form-submit'>
                <Button disabled={this.state.disabled} {...submit} />
              </div>
            : null
        }
      </form>
    );
  }


  /**
   * When the submit button is clicked
   * @param e
   */
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {

      if (typeof this.props.onSubmit === 'function') {
        this.props.onSubmit.call(this);
      } else {

        this.setState({
          disabled: true
        });

        ajax.post(this.props.action, this.getFormData())
          .then(() => {
            Message('表单提交啦~');
            this.setState({
              disabled: false
            });
          });
      }
    }
  }


  /**
   * Test whether the form is valid
   * @returns {boolean}
   */
  isValid() {
    let valid = true;

    this.controls.forEach((control) => {
      valid = control.isValid() && valid;
    });

    return valid;
  }


  /**
   * Get form data
   * @returns {FormData}
   */
  getFormData() {
    return new FormData(React.findDOMNode(this));
  }
}