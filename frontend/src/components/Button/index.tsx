import React from "react"
import "./index.css"




interface ButtonProps {
    checked?: boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
}

// <Button> component
const Button: React.FC<ButtonProps> = ({ handleClick, label }) => (
    <button
        onClick={handleClick}
    >
        { label }
    </button>
)

export default Button
