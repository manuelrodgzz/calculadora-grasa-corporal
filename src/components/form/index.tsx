import React from 'react'
import hash from 'object-hash'
import Input from '../input'
import Button from '../button'
import { FormProps } from './types'
import './form.css'

const Form = ({ fields, submitText, onSubmit }: FormProps ) => {

    const initialState = Object.fromEntries(fields.map(field => [ field.name, '' ]))

    const [ formState, setFormState ] = React.useState( initialState )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { target: { name, value } } = e

        setFormState({
            ...formState,
            [name]: value
        })
    }

    return (
        <form onSubmit={ e => e.preventDefault()}>
            {
                fields.map( ( field, index ) => 
                    <Input
                        key={ hash([ index, field ])}
                        onChange={ handleInputChange }
                        value={ formState[ field.name ] }
                        { ...field }
                    />
                    
                )
            }

            { <Button text={ submitText } onClick={ () => onSubmit(formState) } /> }


            { <Button text='Limpiar' onClick={ () => setFormState( initialState )} type='secondary'/> }
        </form>
    )
}

export default Form