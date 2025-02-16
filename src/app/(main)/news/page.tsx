import {News} from '@pages/news/news'
import {getNews} from '@src/actions/news'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Новости проекта «Кронфорт» в Кронштадте',
    description:
      'Все новости о строящемся проекте «Кронфорт» в Крошнтадте: акции, ход строительства, новости о компании и ходе строительства.',
    alternates: {
      canonical: new URL('/news', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function NewsPage() {
  const news = await getNews()

  return <News news={news} h1_details={true}/>
}
