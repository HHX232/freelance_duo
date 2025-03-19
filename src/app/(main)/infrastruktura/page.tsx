import {Metadata} from 'next'

import {infrastructureData} from '@src/contentData/infrastructure_data'
import {ContentPageWi1thNumbers} from '@shared/ContentPageWithNumbers/ContentPageWithNumbers'
import Header from '@shared/page/header/Header'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Инфраструктура ЖК «Кронфорт», Кронштадт',
    description:
      'Инфраструктура малоэтажного жилого комплекса «Кронфорт» в Кронштадте включает в себя 5 жилых корпусов, свыше 90 магазинов, торговые бульвары, паркинги, детские сады, образовательный лицей.',
    alternates: {
      canonical: new URL('/infrastruktura', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <ContentPageWi1thNumbers data={infrastructureData} title='Инфраструктура' />
      </main>
    </>
  )
}
