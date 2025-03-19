import {Metadata} from 'next'
import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import TransportWrapper from '@pages/transport/TransportWrapper'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Транспортная доступность',
    description: '',
    alternates: {
      canonical: new URL('/transport', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Transport() {
  return (
    <>
      <Header />
      <main>
        <TransportWrapper />
      </main>
      <Footer />
    </>
  )
}
