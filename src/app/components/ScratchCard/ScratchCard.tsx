"use client"
import React, { MouseEventHandler, useState } from 'react'
import ScratchCardCover from './ScratchCardCover'

type scratchCard = {
    canvasHeight: number
    canvasWidth: number
}

const ScratchCard = ({ canvasHeight = 400, canvasWidth = 400 }: scratchCard) => {
    const [path, setPath] = useState("")
    const [isMouseDown, setIsMouseDown] = useState(false)
    const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {

        if (isMouseDown) {
            const svgElement = e.currentTarget;
            const rect = svgElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setPath(p => p + `M ${x} ${y} L ${x} ${y} `)
        }
    }

    const handleMouseDown = () => {
        setIsMouseDown(true)
    }

    const handleMouseUp = () => {
        setIsMouseDown(false)

    }


    return (
        <div>
            <svg
                style={{ background: "#222", borderRadius: 40 }}
                height={canvasHeight}
                width={canvasWidth}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
            >
                <defs>
                    <mask id="myMask" fill="white">
                        <path d={path} stroke="#000" strokeWidth={80} strokeLinecap="round" fill="none" />
                    </mask>
                </defs>
                <rect height={canvasHeight} width={canvasWidth} fill="white" />
                <ScratchCardCover canvasHeight={canvasHeight} canvasWidth={canvasHeight} color={'#11ff99'} />
                <g mask="url(#myMask)">
                </g>
            </svg>
        </div>

    )
}

export default ScratchCard