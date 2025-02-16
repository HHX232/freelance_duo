import {Metadata} from 'next'
import {aboutCentralData} from '@src/contentData/about_central_data'
import Header from '@shared/page/header/Header'
import ContentPageWithMultiSlider from '@shared/ContentPageWithMultiSlider/ContentPageWithMultiSlider'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Бутик-квартал «Кронфорт Центральный» в Кронштадте, застройщик ГК «Алькор»',
    description:
      'Малоэтажный видовой бутик-квартал «Центральный» для комфортного жилья и отдыха в Кронштадте на берегу моря, является частью нового жилого квартала «Кронфорт», в 60 мин езды от Санкт-Петербурга, старт продаж квартир начнется в 2024 году.',
    alternates: {
      canonical: new URL('/tsentralnyi', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <ContentPageWithMultiSlider data={aboutCentralData} title={'"Кронфорт.<br/>Центральный"'}/>
      </main>
    </>
  )
}
