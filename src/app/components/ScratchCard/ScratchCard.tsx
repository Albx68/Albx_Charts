"use client"
import React, { MouseEventHandler, useState } from 'react';
import ScratchCardCover from './ScratchCardCover';
import HiddenCard from './HiddenCard';
import { easeIn, easeInOut, motion } from 'framer-motion';
import SquigglyConfetti from './SquigglyConfetti';
import PopConfetti from './PopConfetti';

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

    const cardOpened = path.length > 3000
    return (
        <div className='relative'>
            <motion.svg
                animate={{ scale: cardOpened ? [1, 1.1,] : 1 }}
                transition={{ duration: 0.1, ease: easeIn, type: "spring" }}
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
                    {!cardOpened && <HiddenCard />}
                </g>
                {cardOpened && <HiddenCard />}
            </motion.svg>
            <Confetti />
            {/* {cardOpened && <Confetti />} */}
        </div>
    );
};

export default ScratchCard;

const Confetti = () => {
    return <div className='absolute'>
        <div className=''><PopConfetti /></div>
        <div className='absolute top-0 -translate-x-64 -translate-y-96 -rotate-90'><SquigglyConfetti color={'#55FFA3'} transition={{ delay: 0.1 }} /></div>
        <div className='absolute top-0 translate-x-40 -translate-y-28'><SquigglyConfetti color={'#55FFA3'} transition={{ delay: 0.2 }} /></div>
        <div className='absolute top-0 translate-x-80 rotate-12  -translate-y-96'><SquigglyConfetti color={'#55FFA3'} transition={{ delay: 0.4 }} /></div>
    </div>
} 
