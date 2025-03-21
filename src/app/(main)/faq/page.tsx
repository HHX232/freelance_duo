import {Metadata} from 'next'

import {FAQ} from '@src/components/FAQ/FAQ'
import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'FAQ',
    description: 'FAQ',
    alternates: {
      canonical: new URL('/faq', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main>
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
