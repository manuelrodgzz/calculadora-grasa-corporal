import React, { useState } from 'react'
import Form from '../form'
import { InputProps } from '../input/types'
import Spectrum from '../spectrum';
import { SpectrumRange } from '../spectrum/types';
import { PersonData } from './types';

const FatCalculator = () => {
    
    const [ personData, setPersonData ] = useState<PersonData>({
        gender: '',
        height: 0,
        weight: 0,
        waist: 0,
        neck: 0
    })

    const formFields: InputProps[] = [
        {
            type: 'radio',
            name: 'gender',
            label: 'Género',
            options: [
                { label: 'Hombre', value: 'male' },
                { label: 'Mujer', value: 'female' },
            ]
        },
        {
            type: 'number',
            name: 'height',
            label: 'Altura (cm)',
            placeholder: 'Escribe tu altura'
        },
        {
            type: 'number',
            name: 'weight',
            label: 'Peso (kg)',
            placeholder: 'Escribe tu peso'
        },
        {
            type: 'number',
            name: 'waist',
            label: 'Cintura (cm)',
            placeholder: 'Medida de tu cintura'
        },
        {
            type: 'number',
            name: 'neck',
            label: 'Cuello (cm)',
            placeholder: 'Medida de tu cuello'
        },
    ]

    const spectrumRanges: SpectrumRange[] = [
        { begins: 2, ends: 4, color: '#009DDE', label: 'Esencial' },
        { begins: 6, ends: 13, color: '#019C3D', label: 'Deportista' },
        { begins: 14, ends: 17, color: '#99C21D', label: 'Fitness' },
        { begins: 18, ends: 25, color: '#FECA00', label: 'Aceptable' },
        { begins: 25, ends: 100, color: '#D76427', label: 'Obeso' },
    ]

    const handleSubmit = (formData: Record<keyof PersonData, string>) => {

        const { gender, height, weight, waist, neck } = formData

        setPersonData({
            gender,
            height: Number(height),
            weight: Number(weight),
            waist: Number(waist),
            neck: Number(neck)
        })
    }

    console.log(personData)

    return (
        <div className='columns'>
            <div className='column'>

                <h1>Calculadora de Grasa Corporal</h1>
                <p>
                    El método de la Marina de Estados Unidos (US Navy Method) ofrece 
                    una manera sencilla de calcular un aproximado del porcentaje de 
                    tejido adiposo en el cuerpo de una persona.

                    <br />
                    <br />

                    Los valores requeridos por la fórmula son los siguientes:
                </p>

                <Form fields={ formFields } submitText='Calcular' onSubmit={ handleSubmit } />
            </div>

            <div className='column'>
                <Spectrum ranges={ spectrumRanges } value={ 7 } />
            </div>
        </div>
    )
}

export default FatCalculator