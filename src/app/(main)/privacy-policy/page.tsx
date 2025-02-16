import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import {Metadata} from 'next'
import {Policy} from '@pages/policy/policy'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Политика конфиденциальности',
    description: 'Политика конфиденциальности',
    alternates: {
      canonical: new URL('/privacy-policy', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function PolicyPage() {
  return (
    <>
      <Header />
      <main>
        <Policy />
      </main>
      <Footer />
    </>
  )
}
