import React from 'react'
import { InputProps } from './types'
import hash from 'object-hash'
import './input.css';

const Input = ( field: InputProps ) => {

    const { label, name, placeholder, type, value, onChange } = field

    if ( type === 'radio' ) {
        
        return (
            <React.Fragment>

                <label className='field-label'>{ label }</label>    
                {
                    field.options.map( ( option, optionIndex ) => (
                        <React.Fragment key={`${ option.value } ${ optionIndex }`}>
                            <input
                                id={ hash([ option.label, name ])}
                                type={ type }
                                name={ name }
                                value={ option.value }
                                onChange={ onChange }
                                checked={ value !== undefined ? (value === option.value) : undefined }
                            />

                            <label
                                htmlFor={ hash([ option.label, name ])}
                            >
                                { option.label }
                            </label>
                        </React.Fragment>
                    ))
                }
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
            <label
                className='field-label'
                htmlFor={ hash([ label, name ])}
            >
                { label }
            </label>

            <input
                id={ hash([ label, name ])}
                type={ type }
                placeholder={ placeholder }
                name={ name }
                onChange={ onChange }
                value={ value !== undefined ? value : undefined }
            />
        </React.Fragment>
    )
}

export default Input