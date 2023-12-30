"use client"

import { MouseEventHandler, SVGProps, useState } from "react"
import { generateCubicPath, generateLinearPath, generatePathPoints, findClosestPoint, getXinRange, getYinRange } from "../utils/helpers/ChartHelpers"
import { item, point, range } from "../utils/types/TChart"
import { SVGMotionProps, easeInOut, motion } from "framer-motion"
type LineChartProps = {
    canvasHeight: number,
    canvasWidth: number,
    pathOptions?: SVGMotionProps<SVGPathElement>,
    data: item[],
    xRange: range,
    yRange: range
}

const LineChart = ({ canvasHeight, canvasWidth, pathOptions, data, xRange, yRange }: LineChartProps) => {
    const [selectedValue, setSelectedValue] = useState<item>()
    const [selectedPoint, setSelectedPoint] = useState<point>({ x: 100, y: 100 })

    const pathPoints = generatePathPoints({ canvasHeight, canvasWidth, data, yRange, xRange })
    const pathString = generateLinearPath(pathPoints)


    const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
        const svgElement = e.currentTarget;
        const rect = svgElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const closestPoint = findClosestPoint({ canvasWidth, data, x, xRange })
        const interpolatedPoint = {
            x: getXinRange({ canvasWidth, value: closestPoint?.time, xRange }),
            y: getYinRange({ canvasHeight, value: closestPoint?.value, yRange })
        }
        setSelectedValue(closestPoint)
        setSelectedPoint(interpolatedPoint)
    }
    return <div>
        <svg width={canvasWidth} height={canvasHeight} onMouseMove={handleMouseMove} className="cursor-grabbing">
            <motion.path animate={{ d: pathString, pathLength: [0, 1] }} transition={{ duration: 2, ease: easeInOut }} fill="none" stroke={"#11ff99"} strokeWidth={8} strokeLinecap="round"  {...pathOptions} />
            <circle cx={selectedPoint.x} cy={selectedPoint.y} r={10} fill="none" stroke="white" strokeWidth={8} />
            {/* <text x={selectedPoint.x} y={selectedPoint.y} textAnchor="middle" fill="white" fontWeight={"bold"} fontSize={43}>{selectedValue}</text> */}
        </svg>
        <motion.div>
            <p>{selectedValue?.value}</p>
            <p>{selectedValue?.time}</p>
        </motion.div>
    </div>
}

export default LineChart


