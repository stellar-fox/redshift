import React, { Component } from 'react';
import './RadioTag.css';

export default class RadioTag extends Component {
  render() {
    return (
      <div className='radio-tag' onClick={this.props.handleClick}>
        <input defaultChecked={this.props.checked}
          value={this.props.value} name={this.props.name} type='radio' />
        <label>{this.props.label}</label>
      </div>
    )
  }
}
