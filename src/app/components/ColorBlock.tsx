import React from 'react'
import { colorMap, colorsArr } from '../utils/constants/colors'
import { colors } from '../utils/types/TColors'

const ColorBlock = ({ selectedColor, setSelectedColor }: {
    selectedColor: colors, setSelectedColor: React.Dispatch<React.SetStateAction<colors>>
}) => {
    const diameter = 30
    const handleClick = (color: colors) => {
        setSelectedColor(color)
    }
    return (
        <div className='bg-neutral-700 flex gap-4 rounded-lg p-4'>
            {colorsArr.map(color => {
                const isSelected = color === selectedColor
                return <div key={color} className='relative cursor-pointer' onClick={handleClick}>
                    <div style={{ backgroundColor: colorMap[color], height: diameter, width: diameter, borderRadius: diameter }} />
                    {isSelected && <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4  border-white' style={{ backgroundColor: "transparent", height: diameter, width: diameter, borderRadius: diameter + 6 }} />}
                    <div className='hover:blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' style={{ backgroundColor: colorMap[color], height: diameter, width: diameter, borderRadius: diameter }} />
                </div>
            })}
        </div>
    )
}

export default ColorBlock

