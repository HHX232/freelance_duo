import Header from '@shared/pageDefault/header/Header'
import {Metadata} from 'next'
import MortgageCalculateWrapper from '@pages/mortgage-calculate/MortgageCalculateWrapper'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Ипотечный калькулятор – ЖК «Кронфорт», Кронштадт',
    description: '',
    alternates: {
      canonical: new URL('/mortgage-calculate', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Parking() {
  return (
    <div>
      <Header />
      <main>
        <MortgageCalculateWrapper />
      </main>
    </div>
  )
}
