import Header from '@shared/pageDefault/header/Header'
import {Metadata} from 'next'
import {Developer} from '@pages/developer/developer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ГК «Алькор» – застройщик ЖК «Кронфорт» в Кронштадте',
    description:
      'ГК «Алькор» застройщик жилого кластера «Кронфорт» в Кронштадте, объединяющий два малоэтажных жилых квартала с социальной и коммерческой инфраструктурой, а также яхтенный порт с культурно-досуговым комплексом.',
    alternates: {
      canonical: new URL('/alkor', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function DeveloperPage() {
  return (
    <>
      <Header />
      <main>
        <Developer />
      </main>
    </>
  )
}
