"use client"

import { MouseEventHandler, SVGProps, TouchEventHandler, useState } from "react"
import { generateDummyData, generatePathString, generatePathPoints, getXinRange } from "../utils/helpers/ChartHelpers"
import { item, range } from "../utils/types/TChart"
type LineChartProps = {
    canvasHeight: number,
    canvasWidth: number,
    pathOptions?: SVGProps<SVGPathElement>
}

const LineChart = ({ canvasHeight, canvasWidth, pathOptions }: LineChartProps) => {
    const [selectedValue, setSelectedValue] = useState<number>()
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
        <div>{selectedValue}</div>
    </div>
}

export default LineChart


const findClosestPoint = ({ x, canvasWidth, data, xRange }: { x: number, canvasWidth: number, data: item[], xRange: range }) => {
    const xInRange = Math.max(x, 0)

    const index = Math.round(
        (xInRange /
            getXinRange({
                canvasWidth,
                value: data[data.length - 1]!.time,
                xRange
            }) *
            (data.length - 1)
        ))
    const pointIndex = Math.min(Math.max(index, 0), data.length - 1)

    if (data[pointIndex]) {
        return data[pointIndex]
    }

}