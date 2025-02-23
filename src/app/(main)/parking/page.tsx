import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import {Metadata} from 'next'
import ParkingWrapper from '@pages/parking/ParkingWrapper'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Паркинг – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в сравнение выбранные квартиры жилого комплекса «Кронфорт» в Кронштадте.',
    alternates: {
      canonical: new URL('/parking', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Parking() {
  return (
    <>
      <Header />
      <main>
        <ParkingWrapper />
      </main>
      <Footer />
    </>
  )
}
