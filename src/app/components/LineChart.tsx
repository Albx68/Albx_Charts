"use client"

import { MouseEventHandler, SVGProps, useState } from "react"
import { generateCubicPath, generateLinearPath, generatePathPoints, findClosestPoint, getXinRange, getYinRange } from "../utils/helpers/ChartHelpers"
import { item, point, range } from "../utils/types/TChart"
import { SVGMotionProps, easeInOut, motion } from "framer-motion"
import { formatTime } from "../utils/helpers/time"
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
    const [selectedValue, setSelectedValue] = useState<item>(data[0])
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

    const handleOnMouseEnter: MouseEventHandler<SVGSVGElement> = () => {
        setShowSelectedValue(true)
    }
    const handleOnMouseLeave: MouseEventHandler<SVGSVGElement> = () => {
        setShowSelectedValue(false)

    }
    return <div>
        <svg width={canvasWidth} height={canvasHeight} onMouseMove={handleMouseMove} className="cursor-grabbing" onMouseLeave={handleOnMouseLeave} onMouseEnter={handleOnMouseEnter}>
            <motion.path animate={{ d: pathString, pathLength: [0, 1] }} transition={{ duration: 2, ease: easeInOut }} fill="none" stroke={"#11ff99"} strokeWidth={8} strokeLinecap="round"  {...pathOptions} />
            <circle cx={selectedPoint.x} cy={selectedPoint.y} r={10} fill="none" stroke="white" strokeWidth={8} />
            {/* <text x={selectedPoint.x} y={selectedPoint.y} textAnchor="middle" fill="white" fontWeight={"bold"} fontSize={43}>{selectedValue}</text> */}
        </svg>
        <div className="flex justify-center">
            {showSelectedValue && <motion.div className="flex flex-col items-center">
                <p>{selectedValue?.value}</p>
                <p>{formatTime(selectedValue?.time, "h:mm a")}</p>
            </motion.div>}
        </div>
    </div>
}

export default LineChart


