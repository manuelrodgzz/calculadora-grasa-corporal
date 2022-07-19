import React from 'react'
import { ButtonProps } from './types'
import './button.css'

const Button = ({ text, type = 'primary', htmlType, onClick }: ButtonProps) => {

    return (
        <button className={ `background-${ type }` } type={ htmlType } onClick={ onClick }>
            { text }
        </button>
    )
}

export default Button