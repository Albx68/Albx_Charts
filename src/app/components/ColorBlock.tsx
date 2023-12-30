import React from 'react'
import { colorMap, colorsArr } from '../utils/constants/colors'

const ColorBlock = () => {
    const diameter = 30
    return (
        <div className='bg-neutral-700 flex gap-4 rounded-lg p-4'>
            {colorsArr.map(color => <div key={color} className='relative'>
                <div style={{ backgroundColor: colorMap[color], height: diameter, width: diameter, borderRadius: diameter }} />
                <div className='hover:blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' style={{ backgroundColor: colorMap[color], height: diameter, width: diameter, borderRadius: diameter }} />
            </div>)}
        </div>
    )
}

export default ColorBlock

