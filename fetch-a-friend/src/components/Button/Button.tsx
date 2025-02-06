import React from 'react'
import "./Button.scss"

type ButtonProps = {
    text: string,
    type: "submit" | "button",
    disabled?: boolean,
    action?: () => void
}
const Button:React.FC<ButtonProps> = ({text, type, action, disabled}) => {
    return (
        <button className="btn" area-label={text || "submit"} type={type} disabled={disabled} onClick={action}>{text}</button>
    )
}
export default Button
