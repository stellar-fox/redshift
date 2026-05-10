import React from "react"

import "./index.css"




interface InputProps {
    label: string;
    value?: string;
    inputType?: string;
    maxLength?: number | string;
    autoComplete?: string;
    keyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    subLabel?: string;
}

// <Input> component
const Input: React.FC<InputProps> = (props) => (
    <div className="lcars-input">
        <ul>
            <li>
                <label htmlFor="name">{props.label}</label>
                <input
                    value={props.value}
                    type={props.inputType}
                    maxLength={props.maxLength as any}
                    autoComplete={props.autoComplete}
                    onKeyPress={props.keyPress}
                    onChange={props.handleChange}
                />
                <span>{props.subLabel}</span>
            </li>
        </ul>
    </div>
)

export default Input
