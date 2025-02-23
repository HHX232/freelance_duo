import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import {Metadata} from 'next'
import StoreRooms from '@pages/storerooms/StoreRooms'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Кладовые – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в сравнение выбранные квартиры жилого комплекса «Кронфорт» в Кронштадте.',
    alternates: {
      canonical: new URL('/storerooms', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}
export default function StoreRoomes() {
  return (
    <>
      <Header />
      <main>
        <StoreRooms/>
      </main>
      <Footer />
    </>
  )
}
