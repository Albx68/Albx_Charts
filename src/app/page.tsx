import Image from 'next/image'
import LineChart from './components/LineChart'
import { generateDummyData } from './utils/helpers/ChartHelpers'

export default function Home() {
  const endTime = new Date().getTime()
  const startTime = endTime - 60 * 1000 * 60 * 12 //12 hour gap
  const timeGap = 60 * 1000 * 12 //12 minutes
  const data = generateDummyData(startTime, endTime, timeGap)
  const valueMin = Math.min(...data.map(item => item.value))
  const valueMax = Math.max(...data.map(item => item.value))
  const verticalPadding = 20
  const horizontalPadding = 20
  const yRange = {
    min: valueMin - verticalPadding,
    max: valueMax + verticalPadding
  }
  const xRange = {
    min: startTime - horizontalPadding,
    max: endTime + horizontalPadding
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LineChart canvasHeight={300} canvasWidth={600} data={data} xRange={xRange} yRange={yRange} />
    </main>
  )
}
