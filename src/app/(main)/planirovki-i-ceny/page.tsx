import type {Metadata} from 'next'
import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {getFilters} from '@src/actions/filters'
import CatalogPageWrapper from '@pages/catalog/catalog.page'
import {getFlatsAll} from '@src/actions/flats'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Купить квартиру в ЖК «Кронфорт Центральный», Кронштадт',
    description:
      'Выбрать и купить квартиру в строящемся доме по выгодным ценам ЖК «Кронфорт» в Кронштадте; продажа квартир в новостройке от застройщика с видом на залив, в 40 минутах езды от Санкт-Петербурга.',
    alternates: {
      canonical: new URL('/planirovki-i-ceny', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function CatalogObjectsPage() {
  const data = await getFlatsAll()
  const filters = await getFilters()

  console.log(filters)

  return (
    <div>
      <Header />
      <main>
        <CatalogPageWrapper data={data} filters_data={filters} />
      </main>
      <Footer />
    </div>
  )
}
