import React, { useMemo } from 'react'
import { SpectrumProps } from './types';
import hash from 'object-hash'
import './spectrum.css'

const Spectrum = ({ ranges, value }: SpectrumProps) => {

    // Calculate the marker offset
    const markerMarginLeft = useMemo<string>(() => {

        let marginLeft = 0

        // Percentage of the total width of each range
        const blockPercentage = 100 / ranges.length

        // Loop through ranges
        for ( let range of ranges ) {

            // If the value is not bigger than the limit of the current range
            if ( value <= range.ends ) {

                const rangeDiff = value - range.begins

                // Calculate how much margin-left is needed
                marginLeft += ( rangeDiff / ( range.ends - range.begins )) * blockPercentage
                break

            } else {

                // If value is bigger than the limit of the current range just add the percentage of the block
                marginLeft += blockPercentage

            }
        }

        // Since the marker is centered, we need to subtract half of the width
        return `calc(${ marginLeft }% - 1rem)`

    }, [ ranges, value ])

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
