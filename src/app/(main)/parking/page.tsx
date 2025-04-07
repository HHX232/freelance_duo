import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {Metadata} from 'next'
import ParkingWrapper from '@pages/parking/ParkingWrapper'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Паркинг – ЖК «Кронфорт», Кронштадт',
    description: '',
    alternates: {
      canonical: new URL('/parking', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Parking() {
  return (
    <div>
      <Header />
      <main>
        <ParkingWrapper />
      </main>
      <Footer />
    </div>
  )
}
