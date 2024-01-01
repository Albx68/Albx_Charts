import React from 'react';

type CoverProps = {
    canvasHeight: number;
    canvasWidth: number;
    color: string;
};

const ScratchCardCover = ({ canvasHeight, canvasWidth, color }: CoverProps) => {
    const noOfLines = 10;
    const stroke = canvasHeight / noOfLines;


    const patternA = Array.from({ length: noOfLines }).map((_, i) => {
        const x = -canvasWidth;
        const y = i * stroke
        const darkenedColor = darkenColor(color, (i + 1) * 0.06);
        return (
            <rect
                key={i}
                fill={darkenedColor}
                x={x}
                y={y}
                height={stroke}
                stroke={darkenedColor}
                width={canvasWidth * 2}
            ></rect>
        );
    });


    return <g>
        {patternA}
    </g>;
};

export default ScratchCardCover;


const hexToRgb = (hex: string) =>
    hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)!
        .map(x => parseInt(x, 16));

const darkenColor = (hexColor: string, factor: number) => {
    const clampedFactor = Math.max(0, Math.min(factor, 1));

    const rgbColor = hexToRgb(hexColor);

    const darkenedColor = rgbColor.map(component => Math.round(component * (1 - clampedFactor)));

    const darkenedHexColor = `#${darkenedColor.map(c => c.toString(16).padStart(2, '0')).join('')}`;

    return darkenedHexColor;
};
