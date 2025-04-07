import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {Metadata} from 'next'
import {Oferta} from '@pages/oferta/oferta'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Публичный договор-оферта',
    description: 'Публичный договор-оферта',
    alternates: {
      canonical: new URL('/oferta', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function OfertaPage() {
  return (
    <div>
      <Header />
      <main>
        <Oferta />
      </main>
      <Footer />
    </div>
  )
}
