import React from "react"

import "./index.css"




interface InputProps {
    label: string;
    value?: string;
    inputType?: string;
    maxLength?: number | string;
    autoComplete?: string;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    subLabel?: string;
    rows?: number;
}

// <Input> component
const Input: React.FC<InputProps> = (props) => (
    <div className="lcars-input">
        <ul>
            <li>
                {props.label && <label htmlFor="name">{props.label}</label>}
                {props.inputType === "textarea" ? (
                    <textarea
                        value={props.value}
                        maxLength={props.maxLength as any}
                        autoComplete={props.autoComplete}
                        onChange={props.handleChange}
                        rows={props.rows || 4}
                        style={{ resize: "vertical", minHeight: "80px" }}
                    />
                ) : (
                    <input
                        value={props.value}
                        type={props.inputType}
                        maxLength={props.maxLength as any}
                        autoComplete={props.autoComplete}
                        onKeyUp={props.onKeyUp}
                        onChange={props.handleChange}
                    />
                )}
                {props.subLabel && <span>{props.subLabel}</span>}
            </li>
        </ul>
    </div>
)

export default Input
