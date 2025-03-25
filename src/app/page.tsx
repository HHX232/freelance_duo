import {Metadata} from 'next'
import MapPage from '@pages/map/Map'
//import {RedirectType, redirect} from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  // TODO заменить данные
  return {
    title: 'Кронфорт – новые жилые кварталы в Кронштадте от застройщика ГК «Алькор»',
    description:
      'Новый малоэтажный квартал «Кронфорт» в Кронштадте от застройщика ГК «Алькор», жилой квартал находится на побережье Финского залива и входит в систему Острова фортов, старт продаж квартир – 1 квартал 2024 года.',
    alternates: {
      canonical: 'http://localhost:3000'
    },
    metadataBase: new URL('http://localhost:3000'),
    openGraph: {
      type: 'website',
      siteName: 'Кронфорт',
      locale: 'ru_RU',
      phoneNumbers: '+74951234567',
      emails: 'kronfort@gmail.com',
      images: [
        {
          url: 'https://localhost:3000/public/content/banner.png',
          alt: 'Изображение жилого квартара Кронфорт',
          width: 3800,
          height: 2100
        },
        {
          url: 'https://localhost:3000/public/content/cluster.png',
          alt: 'Изображение кластера Кронфорт',
          width: 4000,
          height: 3000
        }
      ]
    }
  }
}

export default function Home() {
  return <MapPage />
}
