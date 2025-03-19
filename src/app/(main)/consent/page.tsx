import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {Metadata} from 'next'
import {Consent} from '@pages/consent/consent'
// import Footer from '@shared/pageDefault/footer/footer'
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Согласие на обработку персональных данных',
    description: 'Согласие на обработку персональных данных',
    alternates: {
      canonical: new URL('/consent', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function ConsentPage() {
  return (
    <>
      <Header />
      <main>
        <Consent />
      </main>
      <Footer />
    </>
  )
}
