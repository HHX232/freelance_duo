import {Metadata} from 'next'
import FeedbackPage from '@pages/feedback/feedback.page'
import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Служба доверия – позвонить на горячую линию ЖК «Кронфорт»',
    description:
      'Контакты горячей линии службы доверия застройщика «Алькор», позвонить на горячую линию, если есть вопросы и пожелания.',
    alternates: {
      canonical: new URL('/feedback', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <FeedbackPage />
      </main>
      <Footer />
    </>
  )
}
