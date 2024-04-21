import { item, range } from '@/app/utils/types/TChart'
import React from 'react'

type TBarChartProps = {
    canvasHeight: number,
    canvasWidth: number,
    data: item[],
    yRange: range
}



const BarChart = ({ canvasHeight, canvasWidth, data, yRange }: TBarChartProps) => {
    return (
        <svg height={canvasHeight} width={canvasWidth}>
            {data.map((bar, idx) => {
                return <rect key={idx} x={idx * 100} y={0} height={bar.value} width={100} />
            })}
        </svg>
    )
}

export default BarChart
