import {Metadata} from 'next'

import {typesOfFinishesData} from '@src/contentData/types_of_finishes'
import Header from '@shared/page/header/Header'
import ContentPageWithMultiSlider from '@shared/ContentPageWithMultiSlider/ContentPageWithMultiSlider'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Отделка квартир в ЖК «Кронфорт», Кронштадт',
    description:
      'Виды отделки в квартирах ЖК «Кронфорт» в Кронштадте: квартиры в квартале доступны в темном и светлых цветах, в 4 корпусе представлены квартиры со свободной планировкой и без отделки, позволяющих сделать ремонт самостоятельно.',
    alternates: {
      canonical: new URL('/otdelka', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        {/*<ContentPageWithSlider data={typesOfFinishesData} />*/}
        <ContentPageWithMultiSlider data={typesOfFinishesData} title="Отделка"/>
      </main>
    </>
  )
}
