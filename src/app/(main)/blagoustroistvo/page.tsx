import {Metadata} from 'next'

import {landscapingData} from '@src/contentData/landscaping'
import Header from '@shared/pageDefault/header/Header'
import ContentPageWithMultiSlider from '@shared/ContentPages/ContentPageWithMultiSlider/ContentPageWithMultiSlider'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Благоустройство ЖК «Кронфорт», Кронштадт',
    description:
      'Благоустройство жилого комплекса «Кронфорт» в Кронштадте включает в себя благоустроенные дворы, зоны отдыха, детские и спортивные площадки, каждый двор функционально многодостаточен, в них есть места для отдыха, спорта, детских игр.',
    alternates: {
      canonical: new URL('/blagoustroistvo', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <ContentPageWithMultiSlider data={landscapingData} title={'Благоустройство'} />
      </main>
    </>
  )
}
