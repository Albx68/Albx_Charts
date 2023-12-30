
import { item, range, point } from "../types/TChart"

export const generateDummyData = (startTime: number, endTime: number, timeGap: number): item[] => {
    const data = []

    for (let i = startTime; i < endTime; i += timeGap) {
        const currentData = {
            time: i,
            value: getRandomValueFrom({ min: 50, max: 200 })
        }
        data.push(currentData)
    }
    return data

}
export const getXinRange = ({ canvasWidth, value, xRange }: { canvasWidth: number, value: number, xRange: range }) => {
    const diff = xRange.max - xRange.min
    const x = value

    const interpolatedUnit = (x - xRange.min) / diff
    return interpolatedUnit * canvasWidth
}



export const getRandomValueFrom = ({ min, max }: { min: number, max: number }) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const getYinRange = ({ canvasHeight, value, yRange }: { canvasHeight: number, value: number, yRange: range }) => {
    const diff = yRange.max - yRange.min
    const y = value
    const interpolatedUnit = (y - yRange.min) / diff
    return interpolatedUnit * canvasHeight
}

export const generatePathPoints = ({ data, canvasWidth, canvasHeight, xRange, yRange }: { canvasWidth: number, canvasHeight: number, data: item[], xRange: range, yRange: range }): point[] => {
    if (!data) {
        throw new Error("Data is not valid")
    }
    return data.map(item => {
        const x = getXinRange({ canvasWidth, value: item.time, xRange })
        const y = getYinRange({ canvasHeight, value: item.value, yRange })
        return {
            x,
            y
        }
    })
}
export const generateLinearPath = (points: point[]) => {
    if (!points) {
        throw new Error("Data is not valid")
    }

    let pathString = '';
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        // first point needs to start the path
        if (i === 0) {
            pathString += `M ${point.x} ${point.y}`;
        }
        else {


            pathString += `L ${point.x} ${point.y}`
            if (i === points.length - 1) {
                pathString += `L ${point.x} ${point.y}`;
            }

        }

        // If it's the last point, close the path

    }

    return pathString
}

export const generateCubicPath = (points: point[]) => {
    if (!points) {
        throw new Error("Data is not valid")
    }


    let pathString = '';
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        // first point needs to start the path
        if (i === 0) {
            pathString += `M ${point.x} ${point.y}`;
        }
        else {
            const prevPoint = points[i - 1]
            const xDiff = point.x - prevPoint.x
            const prev = points[i - 1]
            const prevPrev = points[i - 2]

            if (prev == null) {
                continue
            }

            const p0 = prevPrev ?? prev
            const p1 = prev
            const cp1x = (2 * p0.x + p1.x) / 3
            const cp1y = (2 * p0.y + p1.y) / 3
            const cp2x = (p0.x + 2 * p1.x) / 3
            const cp2y = (p0.y + 2 * p1.y) / 3
            const cp3x = (p0.x + 4 * p1.x + point.x) / 6
            const cp3y = (p0.y + 4 * p1.y + point.y) / 6
            pathString += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cp3x} ${cp3y}`;
            if (i === points.length - 1) {
                pathString += ` C ${point.x} ${point.y}, ${point.x} ${point.y}, ${point.x} ${point.y}`;
            }

        }

        // If it's the last point, close the path

    }

    return pathString
}


export const findClosestPoint = ({ x, canvasWidth, data, xRange }: { x: number, canvasWidth: number, data: item[], xRange: range }) => {
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

    return data[pointIndex]

}