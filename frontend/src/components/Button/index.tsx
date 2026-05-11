import React from "react"
import "./index.css"




interface ButtonProps {
    checked?: boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    disabled?: boolean;
}

// <Button> component
const Button: React.FC<ButtonProps> = ({ handleClick, label, disabled }) => (
    <button
        onClick={handleClick}
        disabled={disabled}
        className={disabled ? "disabled" : ""}
    >
        { label }
    </button>
)

export default Button
