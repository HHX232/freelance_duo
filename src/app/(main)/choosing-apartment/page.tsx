import {Metadata} from 'next'
import dynamic from 'next/dynamic'
const ChoosingApartmentPageView = dynamic(() => import('@pages/choosing-apartment/choosing.apartment'), {ssr: false})

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Выбор квартиры – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в избранное квартиры жилого комплекса «Кронфорт» в Кронштадте.',
    alternates: {
      canonical: new URL('/izbrannoe', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function ChoosingApartment() {
  return <ChoosingApartmentPageView />
}
