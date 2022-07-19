import React, { useState } from 'react'
import Form from '../form'
import { InputProps } from '../input/types'
import Spectrum from '../spectrum';
import { SpectrumRange } from '../spectrum/types';
import { MaleData, FemaleData } from './types';

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
    {
        if: {
            field: 'gender',
            equals: 'female'
        },
        type: 'number',
        name: 'hip',
        label: 'Cadera (cm)',
        placeholder: 'Medida de tu cadera'
    },
]

const maleRanges: SpectrumRange[] = [
    { begins: 2, ends: 5, color: '#009DDE', label: 'Esencial' },
    { begins: 6, ends: 13, color: '#019C3D', label: 'Deportista' },
    { begins: 14, ends: 17, color: '#99C21D', label: 'Fitness' },
    { begins: 18, ends: 24, color: '#FECA00', label: 'Aceptable' },
    { begins: 25, ends: 100, color: '#D76427', label: 'Obeso' },
]

const femaleRanges: SpectrumRange[] = [
    { begins: 10, ends: 13, color: '#009DDE', label: 'Esencial' },
    { begins: 14, ends: 20, color: '#019C3D', label: 'Deportista' },
    { begins: 21, ends: 24, color: '#99C21D', label: 'Fitness' },
    { begins: 25, ends: 31, color: '#FECA00', label: 'Aceptable' },
    { begins: 32, ends: 100, color: '#D76427', label: 'Obeso' },
]

const FatCalculator = () => {

    const [ bfp, setBfp ] = useState<null | number>(null)
    const [ personGender, setPersonGender ] = useState<'male'|'female'>('male')

    const maleBFPFormula = ( waist: number, neck: number, height: number ): number => {
        return Number((( 495 / (1.0324 - 0.19077 * Math.log10( waist - neck ) + 0.15456 * Math.log10( height ))) - 450).toFixed( 1 ))
    }

    const femaleBFPFormula = ( waist: number, neck: number, height: number, hip: number ): number => {
        return Number((( 495 / (1.29579 - 0.35004 * Math.log10( waist + hip - neck ) + 0.22100 * Math.log10( height ))) - 450).toFixed( 1 ))
    }

    const calculateBFP = (formData: MaleData | FemaleData): void => {

        const { gender, waist, neck, height } = formData

        // Transform form values to number
        const waistNumber = Number( waist )
        const neckNumber = Number( neck )
        const heightNumber = Number( height )
        const hipNumber = formData.gender === 'female' ? Number( formData.hip ) : 0

        let formula: typeof maleBFPFormula | typeof femaleBFPFormula

        formula = gender === 'male' ? maleBFPFormula : femaleBFPFormula

        // Execute formula and save results
        setBfp( formula( waistNumber, neckNumber, heightNumber, hipNumber ))
        setPersonGender( gender )
    }

    // Reset bfp every time gender field changes in order to hide the spectrum
    const handleFieldChange = ( formData: MaleData | FemaleData ): void => {

        if ( formData.gender !== personGender ) {
            setBfp( null )
        }
    }

    return (
        <div className='columns'>

            {/* Form Column */}
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

                <Form fields={ formFields } submitText='Calcular' onChange={ handleFieldChange } onSubmit={ calculateBFP } onClean={ () => setBfp( null )}/>
            </div>

            {/* Spectrum Column */}
            <div className='column'>
                { bfp !== null &&  <Spectrum ranges={ personGender === 'male' ? maleRanges : femaleRanges } value={ bfp } /> }
            </div>
        </div>
    )
}

export default FatCalculator