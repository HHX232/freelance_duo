import {Favorites} from '@pages/favorites/favorites'
import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'В избранное – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в избранное квартиры жилого комплекса «Кронфорт» в Кронштадте.',
    alternates: {
      canonical: new URL('/izbrannoe', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function FavoritesPage() {
  return (
    <>
      <Header />
      <main>
        <Favorites />
      </main>
      <Footer />
    </>
  )
}
