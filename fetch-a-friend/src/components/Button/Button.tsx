import React from 'react'
import "./Button.scss"

type ButtonProps = {
    text: string,
    type: "submit" | "button"
    action: () => void
}
const Button:React.FC<ButtonProps> = ({text, type, action}) => {
    return (
        <button className="btn" type={type} onClick={() => action}>{text}</button>
    )
}
export default Button
