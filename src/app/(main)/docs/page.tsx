import {Metadata} from 'next'
import Header from '@shared/page/header/Header'
import ContentPageWithSlider from '@shared/ContentPageWithSlider/ContentPageWithSlider'
import {documentsData} from '@src/contentData/documents_data'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Документы – ЖК «Кронфорт», Кронштадт',
    description:
      'Информацию о всех необходимых документах о застройщике и жилом комплексе «Кронфорт» в Кронштадте можно найти на этой странице.',
    alternates: {
      canonical: new URL('/docs', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function ContentPage() {
  return (
    <>
      <Header />
      <main>
        <ContentPageWithSlider data={documentsData} />
      </main>
    </>
  )
}
