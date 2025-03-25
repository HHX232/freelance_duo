import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {Metadata} from 'next'
import PaymentMethodsPage from '@pages/payment-methods/payment-methods'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Способы оплаты – ЖК «Кронфорт», Кронштадт',
    description: 'Способы оплаты',
    alternates: {
      canonical: new URL('/payment-methods', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}
export default function StoreRoomes() {
  return (
    <div>
      <Header />
      <main>
        <PaymentMethodsPage />
      </main>
      <Footer />
    </div>
  )
}
