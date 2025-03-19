import {Metadata} from 'next'
import Page from '@shared/page/Page'
import StreetPage from '@pages/street/Street.page'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Точка интереса',
    description: 'Точка интереса',
    alternates: {
      canonical: new URL('/street', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Street() {
  return (
    <Page>
      <StreetPage />
    </Page>
  )
}
