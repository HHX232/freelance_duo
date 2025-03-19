import {Favorites} from '@pages/favorites/favorites'
import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'В избранное – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в избранное квартиры жилого комплекса «Кронфорт» в Кронштадте.'
  }
}

export default async function FavoritesPage() {
  return (
    <>
      <Header dashboard={{information: true, selection: true}} />
      <main>
        <Favorites dashboard={true} />
      </main>
      <Footer dashboard={true} />
    </>
  )
}
