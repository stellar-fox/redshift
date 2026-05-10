import React from "react"

import "./index.css"




interface RadioTagProps {
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    checked?: boolean | string;
    value: string;
    name: string;
    label: string;
}

// <RadioTag> component
const RadioTag: React.FC<RadioTagProps> = ({ handleClick, checked, value, name, label }) => (
    <div className="radio-tag" onClick={handleClick}>
        <input
            defaultChecked={!!checked}
            value={value}
            name={name}
            type="radio"
        />
        <label>{label}</label>
    </div>
)

export default RadioTag
