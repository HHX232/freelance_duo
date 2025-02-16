import {Metadata} from 'next'
import News from '@pages/news/news'
import {getNews, getNewsBySlug} from '@src/actions/news'

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {

  const news = await getNewsBySlug(params.slug)

  const canonicalUrl = params.slug
    ? new URL(`/news/${params.slug}`, process.env.NEXT_PUBLIC_SITE_URL).toString()
    : new URL('/news', process.env.NEXT_PUBLIC_SITE_URL).toString()

  const news_title = news.title ? `${news.title} - новости ЖК «Кронфорт»` : 'Новости ЖК «Кронфорт»'
  const news_desc = news.title ? `${news.title} - читайте все новости о ЖК «Кронфорт» на сайте.` : 'Читайте все новости о ЖК «Кронфорт» на сайте.'

  return {
    title: news_title,
    description: news_desc,
    alternates: {
      canonical: canonicalUrl
    }
  }
}

export default async function NewsDetailPage({params}: {params: {slug: string}}) {
  const news = await getNews()

  return <News news={news} id={params.slug} h1={true}/>
}
