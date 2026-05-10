import React, { Component } from "react"

import "pretty-checkbox/dist/pretty-checkbox.min.css"
import "./index.css"




interface CheckboxProps {
    isChecked: boolean;
    label: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// <Checkbox> component
export default class Checkbox extends Component<CheckboxProps> {

    // ...
    state = { checked: false }


    // ...
    render = () =>
        <div className="pretty p-default p-curve p-thick">
            <input
                checked={this.props.isChecked}
                type="checkbox"
                onChange={this.props.handleChange}
            />
            <div className="state">
                <label>{this.props.label}</label>
            </div>
        </div>

}
