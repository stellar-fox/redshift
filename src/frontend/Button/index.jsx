import React from "react"
import "./index.css"




// <Button> component
export default ({ checked, handleClick, label, }) =>
    <button
        checked={checked}
        onClick={handleClick}
    >
        { label }
    </button>
