"use client"

import { generateDummyData, generatePathString, generatePathPoints } from "../utils/helpers/ChartHelpers"

type LineChartProps = {
    canvasHeight: number,
    canvasWidth: number
}

const LineChart = ({ canvasHeight = 200, canvasWidth = 400 }: LineChartProps) => {
    const endTime = new Date().getTime()
    const startTime = endTime - 60 * 1000 * 60 * 12 //12 hour gap
    const timeGap = 60 * 1000 * 12 //12 minutes
    const data = generateDummyData(startTime, endTime, timeGap)
    const valueMin = Math.min(...data.map(item => item.value))
    const valueMax = Math.max(...data.map(item => item.value))
    const yRange = {
        min: valueMin,
        max: valueMax
    }
    const xRange = {
        min: startTime,
        max: endTime
    }
    const pathPoints = generatePathPoints({ canvasHeight, canvasWidth, data, yRange, xRange })
    const pathString = generatePathString(pathPoints)
    return <div>
        <svg width={canvasWidth} height={canvasHeight}>
            <path d={pathString} fill="none" stroke="#11ff99" strokeWidth={8}>
            </path>
        </svg>
    </div>
}

export default LineChart


