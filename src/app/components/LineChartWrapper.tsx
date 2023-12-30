"use client"

import React from 'react'
import useWindowDimensions from '../utils/hooks/useWindowDimensions';
import { DateTime } from 'luxon';
import { generateDummyData } from '../utils/helpers/ChartHelpers';
import LineChart from './LineChart';

const LineChartWrapper = () => {
    const dimensions = useWindowDimensions()
    const dateTime = DateTime.local();
    const endTime = dateTime.toMillis();
    const startTime = endTime - 60 * 1000 * 60 * 12 //12 hour gap
    const timeGap = 60 * 1000 * 15 //15 minutes
    const data = generateDummyData(startTime, endTime, timeGap)
    const valueMin = Math.min(...data.map(item => item.value))
    const valueMax = Math.max(...data.map(item => item.value))
    const verticalPadding = 60
    const horizontalPadding = 60 * 1000 * 15
    const yRange = {
        min: valueMin - verticalPadding,
        max: valueMax + verticalPadding
    }
    const xRange = {
        min: startTime - horizontalPadding,
        max: endTime + horizontalPadding
    }
    return (
        <section className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-900">
            <LineChart canvasHeight={300} canvasWidth={dimensions.width} data={data} xRange={xRange} yRange={yRange} />
        </section>
    )
}

export default LineChartWrapper