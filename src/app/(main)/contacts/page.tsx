import {Metadata} from 'next'

import ContactsPage from '@pages/contacts/contacts.page'
import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Контакты – ЖК «Кронфорт», Кронштадт',
    description:
      'Контакты жилого комплекса «Кронфорт» в Кронштадте: адрес на карте, телефон, режим работы, как добраться.',
    alternates: {
      canonical: new URL('/contacts', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return (
    <>
      <Header />
      <main style={{background: '#11627d', overflow: 'hidden', minHeight: '100vh'}}>
        <ContactsPage />
      </main>
      <Footer />
    </>
  )
}
