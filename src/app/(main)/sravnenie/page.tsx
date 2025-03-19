import {Compare} from '@pages/compare/compare'
import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'В сравнение – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в сравнение выбранные квартиры жилого комплекса «Кронфорт» в Кронштадте.',
    alternates: {
      canonical: new URL('/sravnenie', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}
export default function ComparePage() {
  return (
    <>
      <Header />
      <main>
        <Compare />
      </main>
      <Footer />
    </>
  )
}
