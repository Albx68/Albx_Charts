import Image from 'next/image'
import LineChart from './components/LineChart'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LineChart canvasHeight={300} canvasWidth={600} />
    </main>
  )
}
