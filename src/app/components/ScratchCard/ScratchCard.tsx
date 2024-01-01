"use client"
import React, { MouseEventHandler, useState } from 'react';
import ScratchCardCover from './ScratchCardCover';
import HiddenCard from './HiddenCard';

type ScratchCardProps = {
    canvasHeight?: number;
    canvasWidth?: number;
};

const ScratchCard: React.FC<ScratchCardProps> = ({ canvasHeight = 400, canvasWidth = 400 }) => {
    const [path, setPath] = useState('');
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
        if (isMouseDown) {
            const svgElement = e.currentTarget;
            const rect = svgElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setPath((p) => p + `M ${x} ${y} L ${x} ${y} `);
        }
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    console.log("path length", path.length)
    return (
        <div>
            <svg
                style={{ background: '#222', borderRadius: 40, cursor: 'pointer' }}
                height={canvasHeight}
                width={canvasWidth}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
            >
                <defs>
                    <mask id="myMask" fill="white">
                        <path d={path} stroke="#fff" strokeWidth={80} strokeLinecap="round" fill="none" />
                    </mask>
                </defs>
                <ScratchCardCover canvasHeight={canvasHeight} canvasWidth={canvasWidth} color={'#55FFA3'} />
                <g mask="url(#myMask)">
                    <HiddenCard />
                </g>
            </svg>
        </div>
    );
};

export default ScratchCard;
