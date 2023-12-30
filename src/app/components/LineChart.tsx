"use client"

import { MouseEventHandler, SVGProps, TouchEventHandler } from "react"
import { generateDummyData, generatePathString, generatePathPoints } from "../utils/helpers/ChartHelpers"

type LineChartProps = {
    canvasHeight: number,
    canvasWidth: number,
    pathOptions?: SVGProps<SVGPathElement>
}

const LineChart = ({ canvasHeight, canvasWidth, pathOptions }: LineChartProps) => {
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

    const handleTouchMove: TouchEventHandler<SVGSVGElement> = (e) => {
        console.log("touch move", e)
    }

    const handleMouseEnter: MouseEventHandler<SVGSVGElement> = (e) => {
        console.log("mouse enter", e)

    }

    const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
        console.log("mouse move", e)

    }
    return <div>
        <svg width={canvasWidth} height={canvasHeight} onTouchMove={handleTouchMove} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove}>
            <path d={pathString} fill="none" stroke={"#11ff99"} strokeWidth={8} strokeLinecap="round" {...pathOptions}>
            </path>
        </svg>
    </div>
}

export default LineChart


