import {Compare} from '@pages/compare/compare'
import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'В сравнение – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в сравнение выбранные квартиры жилого комплекса «Кронфорт» в Кронштадте.'
  }
}
export default function ComparePage() {
  return (
    <>
      <Header dashboard={{information: true, selection: true}} />
      <main>
        <Compare dashboard={true} />
      </main>
      <Footer dashboard={true} />
    </>
  )
}
