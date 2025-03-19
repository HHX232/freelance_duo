import {Metadata} from 'next'

import {ContentPageWithSlider} from '@shared/ContentPageWithSlider/ContentPageWithSlider'
import {architectureData} from '@src/contentData/architecture_data'
import Header from '@shared/page/header/Header'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Архитектура ЖК «Кронфорт», Кронштадт',
    description:
      'Архитектура ЖК «Кронфорт» формирует современный облик города Кронштадт, малоэтажный жилой комплекс возведен в центре города, рядом с Островом фортов',
    alternates: {
      canonical: new URL('/architektura', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <ContentPageWithSlider data={architectureData} title={"Архитектура"} />
      </main>
    </>
  )
}
