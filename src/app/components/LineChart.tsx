"use client"

import { MouseEventHandler, SVGProps, useState } from "react"
import { generatePathString, generatePathPoints, findClosestPoint, getXinRange, getYinRange } from "../utils/helpers/ChartHelpers"
import { item, point, range } from "../utils/types/TChart"
type LineChartProps = {
    canvasHeight: number,
    canvasWidth: number,
    pathOptions?: SVGProps<SVGPathElement>,
    data: item[],
    xRange: range,
    yRange: range
}

const LineChart = ({ canvasHeight, canvasWidth, pathOptions, data, xRange, yRange }: LineChartProps) => {
    const [selectedValue, setSelectedValue] = useState<number>()
    const [selectedPoint, setSelectedPoint] = useState<point>({ x: 0, y: 0 })

    const pathPoints = generatePathPoints({ canvasHeight, canvasWidth, data, yRange, xRange })
    const pathString = generatePathString(pathPoints)


    const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
        const svgElement = e.currentTarget; // SVG element
        const rect = svgElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const closestPoint = findClosestPoint({ canvasWidth, data, x, xRange })
        console.log("closestPoint", closestPoint)
        const interpolatedPoint = {
            x: getXinRange({ canvasWidth, value: closestPoint?.time, xRange }),
            y: getYinRange({ canvasHeight, value: closestPoint?.value, yRange })
        }
        console.log("interpolatedPoint", interpolatedPoint)
        setSelectedValue(closestPoint?.value)
        setSelectedPoint(interpolatedPoint)
    }
    return <div>
        <svg width={canvasWidth} height={canvasHeight} onMouseMove={handleMouseMove}>
            <path d={pathString} fill="none" stroke={"#11ff99"} strokeWidth={8} strokeLinecap="round" {...pathOptions}>
            </path>
            <text x={selectedPoint.x} y={selectedPoint.y} textAnchor="middle" fill="white" fontWeight={"bold"} fontSize={43}>{selectedValue}</text>
        </svg>
    </div>
}

export default LineChart


