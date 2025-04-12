import {Metadata} from 'next'
import MapPage from '@pages/map/Map'
//import {RedirectType, redirect} from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Кронфорт – новые жилые кварталы в Кронштадте от застройщика ГК «Алькор»',
    description:
      'Новый малоэтажный квартал «Кронфорт» в Кронштадте от застройщика ГК «Алькор», жилой квартал находится на побережье Финского залива и входит в систему Острова фортов, старт продаж квартир – 1 квартал 2024 года.',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : ''}/`
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : ''}`),
    openGraph: {
      type: 'website',
      siteName: 'Кронфорт',
      locale: 'ru_RU',
      phoneNumbers: `${process.env.NEXT_PUBLIC_TELEPHONE_NUMBER ? process.env.NEXT_PUBLIC_TELEPHONE_NUMBER : ''}`,
      emails: `${process.env.NEXT_PUBLIC_MAIL ? process.env.NEXT_PUBLIC_MAIL : ''}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/content/KronfortBannerSocial.jpg`,
          alt: 'Kronfort - рай, а не жилой комплекс!',
          width: 1850,
          height: 1000
        },
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/content/KronfortBannerSecond.png`,
          alt: 'Kronfort - рай, а не жилой комплекс!',
          width: 1080,
          height: 1080
        }
      ]
    }
  }
}

export default function Home() {
  return <MapPage />
}
