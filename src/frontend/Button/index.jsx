import React from "react"
import "./index.css"




// <Button> component
export default () =>
    <button
        checked={this.props.checked}
        onClick={this.props.handleClick}
    >
        {this.props.label}
    </button>
