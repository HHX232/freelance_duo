import Header from '@shared/pageDefault/header/Header'
import {Dashboard} from '@pages/dashboard/dashboard'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Личный кабинет – ЖК «Кронфорт», Кронштадт',
    description: 'Личный кабинет покупателя, ЖК  «Кронфорт», Кронштадт',
    alternates: {
      canonical: new URL('/lk', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function DashboardPage() {
  return (
    <>
      <Header dashboard={{information: true, selection: true}} />
      <main>
        <Dashboard />
      </main>
    </>
  )
}
