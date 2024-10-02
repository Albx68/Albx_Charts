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

    return (
        <svg height={canvasHeight} width={canvasWidth} >
            {data.map((bar, idx) => {
                const height = canvasHeight - getYinRange({ canvasHeight: canvasHeight, value: bar.value, yRange: yRange })

                const x = idx * colWidth
                return <line key={idx} x1={x} x2={x} y1={canvasHeight - height} y2={canvasHeight} stroke={barColor} strokeWidth={barWidth} />
            })}
        </svg>
    )
}

export default BarChart
