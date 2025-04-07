import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {getAllProgress} from '@src/actions/progress'
import {Progress} from '@pages/progress/progress'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Ход и фото строительства квартир в квартале «Кронфорт», Кронштадт',
    description: 'Фотографии хода строительства квартир и инфраструктуры квартала «Кронфорт Центральный» в Кронштадте',
    alternates: {
      canonical: new URL('/gallery', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function ProgressPage() {
  const progress = await getAllProgress()

  return (
    <div>
      <Header />
      <main>
        <Progress progress={progress} />
      </main>
      <Footer />
    </div>
  )
}
