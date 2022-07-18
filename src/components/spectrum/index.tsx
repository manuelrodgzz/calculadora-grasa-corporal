import React, { useMemo } from 'react'
import { SpectrumProps } from './types';
import hash from 'object-hash'
import './spectrum.css'

const Spectrum = ({ ranges, value }: SpectrumProps) => {

    const markerMarginLeft = useMemo(() => {

        let marginLeft = 0
        const blockPercentage = 100 / ranges.length

        for ( let range of ranges ) {

            if ( value <= range.ends ) {

                const rangeDiff = value - range.begins
                marginLeft += ( rangeDiff / ( range.ends - range.begins )) * blockPercentage
                break

            } else {

                marginLeft += blockPercentage

            }
        }

        // Since the marker is centered, we need to subtract half of the width
        return `calc(${ marginLeft }% - 1rem)`

    }, [ ranges, value ])

    console.log(markerMarginLeft)

    const gradientStyles: React.CSSProperties = {
        backgroundImage: `linear-gradient(to right, ${ ranges.map( range => range.color ).join(', ') }`
    }

    const markerStyles: React.CSSProperties = {
        marginLeft: markerMarginLeft
    }

    return (
        <div className='spectrum-container'>

            {/* Marker Container */}
            <div className='spectrum-marker-container' style={ markerStyles }>

                {/* Percentage */}
                <span>{ value }%</span>

                {/* Marker */}
                <div className='spectrum-marker'></div>
            </div>

            {/* Spectrum */}
            <div className='spectrum' style={ gradientStyles }></div>

            {/* List of ranges */}
            <div className='spectrum-ranges'>
                {
                    ranges.map( ({ begins, ends, color, label }, index) => ( 
                        <div key={ hash([ label, index ]) } className='spectrum-range'>

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
