import React from 'react'
import hash from 'object-hash'
import Input from '../input'
import Button from '../button'
import { FormProps } from './types'
import './form.css'

const Form = ({ fields, submitText, onSubmit, onClean, onChange }: FormProps ) => {

    // Initial form state
    const initialState = Object.fromEntries(fields.map(field => [ field.name, '' ]))

    // Form state
    const [ formState, setFormState ] = React.useState( initialState )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        const { target: { name, value } } = e

        const newState = {
            ...formState,
            [name]: value
        }

        setFormState( newState )

        onChange && onChange( newState )
    }

    const handleClean = (): void => {
            
        setFormState( initialState )
        onClean && onClean()
    }

    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault()

        onSubmit(formState)
    }

    return (
        <form onSubmit={ handleSubmit }>

            {/* Form Fields */}
            {
                fields.map( ( field, index ) => 
                    (!field.if || formState[ field.if.field ] === field.if.equals) && <Input
                        key={ hash([ index, field ])}
                        onChange={ handleInputChange }
                        value={ formState[ field.name ] }
                        { ...field }
                    />
                    
                )
            }

            {/* Submit button */}
            { <Button text={ submitText } htmlType='submit' /> }

            {/* Clean button */}
            { <Button text='Limpiar' onClick={ handleClean } type='secondary'/> }
        </form>
    )
}

export default Form