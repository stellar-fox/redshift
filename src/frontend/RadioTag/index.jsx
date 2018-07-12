import React from "react"

import "./index.css"




// <RadioTag> component
export default ({ handleClick, checked, value, name, label, }) =>
    <div className="radio-tag" onClick={handleClick}>
        <input
            defaultChecked={checked}
            value={value}
            name={name}
            type="radio"
        />
        <label>{label}</label>
    </div>
