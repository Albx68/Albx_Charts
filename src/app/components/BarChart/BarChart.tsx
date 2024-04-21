import { getYinRange } from '@/app/utils/helpers/ChartHelpers'
import { item, range } from '@/app/utils/types/TChart'
import React from 'react'

type TBarChartProps = {
    canvasHeight: number,
    canvasWidth: number,
    data: item[],
    yRange: range,
    barColor: string
}



const BarChart = ({ canvasHeight, canvasWidth, data, yRange, barColor }: TBarChartProps) => {
    const colWidth = canvasWidth / data?.length
    const barPad = colWidth / 10
    const barWidth = colWidth - barPad * 2
    console.log("canvas width", canvasWidth, data?.length)
    return (
        <svg height={canvasHeight} width={canvasWidth}>
            {data.map((bar, idx) => {
                const height = canvasHeight - getYinRange({ canvasHeight: canvasHeight, value: bar.value, yRange: yRange })
                return <rect key={idx} fill={barColor} x={idx * colWidth} y={0} height={height} width={barWidth} />
            })}
        </svg>
    )
}

export default BarChart
