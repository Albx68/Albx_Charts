import BarChart from './components/BarChart/BarChart'
import { generateDummyData } from './utils/helpers/ChartHelpers'


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-900">
      <BarChart barColor='#ff9999' canvasHeight={400} canvasWidth={400} data={randData} yRange={{ max: Math.max(...randData.map(el => el.value)), min: 0 }} />
    </main>
  )
}

const randData = generateDummyData(0, 100000, 10000)