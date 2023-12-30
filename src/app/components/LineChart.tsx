"use client"

import { MouseEventHandler, SVGProps, useState } from "react"
import { generateCubicPath, generateLinearPath, generatePathPoints, findClosestPoint, getXinRange, getYinRange, generateSinWavePath } from "../utils/helpers/ChartHelpers"
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
    const [showSelectedValue, setShowSelectedValue] = useState(false)
    const [selectedValue, setSelectedValue] = useState<item | null>(data[0])
    const [selectedPoint, setSelectedPoint] = useState<point | null>({ x: -100, y: -100 })

    const pathPoints = generatePathPoints({ canvasHeight, canvasWidth, data, yRange, xRange })
    const pathString = generateLinearPath(pathPoints)
    const getInterPolatedPoint = (closestPoint: item | null) => {
        if (!closestPoint) {
            return null
        }
        const interpolatedPoint = {
            x: getXinRange({ canvasWidth, value: closestPoint?.time, xRange }),
            y: getYinRange({ canvasHeight, value: closestPoint?.value, yRange })
        }
        return interpolatedPoint
    }

    const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
        const svgElement = e.currentTarget;
        const rect = svgElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const closestPoint = findClosestPoint({ canvasWidth, data, x, xRange })
        const interpolatedPoint = getInterPolatedPoint(closestPoint)
        setSelectedValue(closestPoint)
        setSelectedPoint(interpolatedPoint)
    }

    const handleOnMouseEnter: MouseEventHandler<SVGSVGElement> = () => {
        setShowSelectedValue(true)
    }
    const handleOnMouseLeave: MouseEventHandler<SVGSVGElement> = () => {
        // setShowSelectedValue(false)

    }
    return <div>
        <svg width={canvasWidth} height={canvasHeight} onMouseMove={handleMouseMove} className="cursor-grabbing" onMouseLeave={handleOnMouseLeave} onMouseEnter={handleOnMouseEnter}>
            <motion.path className={"blur-sm bg-blend-color-dodge"} animate={{ d: pathString, pathLength: [0, 1] }} transition={{ duration: 2, ease: easeInOut }} strokeLinejoin={"round"} fill="none" stroke={"#11ff99"} strokeWidth={8} strokeLinecap="round"  {...pathOptions} />
            <motion.path animate={{ d: pathString, pathLength: [0, 1] }} transition={{ duration: 2, ease: easeInOut }} strokeLinejoin={"round"} fill="none" stroke={"#11ff99"} strokeWidth={8} strokeLinecap="round"  {...pathOptions} />

            <circle cx={selectedPoint?.x} cy={selectedPoint?.y} r={10} fill="none" stroke="white" strokeWidth={8} />
            {showSelectedValue && selectedPoint && <text x={selectedPoint?.x} y={selectedPoint?.y - 20} textAnchor="middle" fill="white" fontWeight={"bold"} fontSize={43}>{selectedValue?.value}</text>}
        </svg>
    </div>
}

export default LineChart


