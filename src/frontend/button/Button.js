import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
  render() {
    return (
      <button checked={this.props.checked} onClick={this.props.handleClick}>
        {this.props.label}
      </button>
    )
  }
}
