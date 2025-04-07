import {Metadata} from 'next'

import {ContentPageWithSlider} from '@shared/ContentPages/ContentPageWithSlider/ContentPageWithSlider'
import {locationData} from '@src/contentData/location_data'
import Header from '@shared/pageDefault/header/Header'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Расположение жилого квартала «Кронфорт Центральный», Кронштадт',
    description:
      'Малоэтажный жилой квартал комфорт-класса «Кронфорт Центральный» расположен у парка Остров фортов на юге Кронштадта у Балтийского моря, в 60 мин езды от Санкт-Петербурга.',
    alternates: {
      canonical: new URL('/raspolozhenie', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <ContentPageWithSlider data={locationData} title={'Расположение'} />
      </main>
    </>
  )
}
