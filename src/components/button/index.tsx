import React from 'react'
import { ButtonProps } from './types'
import './button.css'

const Button = ({ text, type = 'primary', onClick }: ButtonProps) => {

    return (
        <button className={ `background-${ type }` } onClick={ onClick }>
            { text }
        </button>
    )
}

export default Button