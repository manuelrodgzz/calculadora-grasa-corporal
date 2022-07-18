import React from 'react'
import { SpectrumProps } from './types';
import './spectrum.css'

const Spectrum = ({ ranges, value }: SpectrumProps) => {

    console.log(value)

    return (
        <div className='spectrum-container'>

            {/* Spectrum */}
            <div className='spectrum'></div>

            <div className='spectrum-ranges'>
                {
                    ranges.map( ({ begins, ends, color, label}, index) => ( 
                        <div className='spectrum-range'>

                            {/* Color box */}
                            <div className='spectrum-color' style={{ backgroundColor: color }}></div>

                            {/* Range */}
                            <span><strong>{ begins }-{ ends }%</strong></span>

                            {/* Range label */}
                            <label>{ label }</label>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Spectrum
