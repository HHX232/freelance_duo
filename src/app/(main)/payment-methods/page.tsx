import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import { Metadata } from 'next'
import PaymentMethodsPage from '@pages/payment-methods/payment-methods'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Кладовые – ЖК «Кронфорт», Кронштадт',
    description: 'Способы оплаты',
    alternates: {
      canonical: new URL('/payment-methods', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}
export default function StoreRoomes() {
  return (
    <>
      <Header />
      <main>
        <PaymentMethodsPage />
      </main>
      <Footer />
    </>
  )
}
