import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {Metadata} from 'next'
import CommerceWrapper from '@pages/commerce/CommerceWrapper'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Коммерция – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в сравнение выбранные квартиры жилого комплекса «Кронфорт» в Кронштадте.',
    alternates: {
      canonical: new URL('/commerce', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}
export default function CommercePage() {
  return (
    <div>
      <Header />
      <main>
        <CommerceWrapper />
      </main>
      <Footer />
    </div>
  )
}
