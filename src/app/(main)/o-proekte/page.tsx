import {Metadata} from 'next'

import {aboutData} from '@src/contentData/about_data'
import {ContentPageWithSlider} from '@shared/ContentPages/ContentPageWithSlider/ContentPageWithSlider'
import Header from '@shared/pageDefault/header/Header'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'О проекте «Кронфорт», Кронштадт',
    description:
      'Жилые малоэтажные кварталы с развитой инфраструктурой «Кронфорт» в Кронштадте находится в пешей доступности от Острова фортов и Балтийского моря, 60 мин от Санкт-Петербурга.',
    alternates: {
      canonical: new URL('/o-proekte', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <ContentPageWithSlider data={aboutData} title='О проекте' />
      </main>
    </>
  )
}
