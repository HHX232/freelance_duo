import {Metadata} from 'next'
import MapPage from '@pages/map/Map'
//import {RedirectType, redirect} from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
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
      phoneNumbers: `${process.env.NEXT_PUBLIC_TELEPHONE_NUMBER ? process.env.NEXT_PUBLIC_TELEPHONE_NUMBER : ''}`,
      emails: `${process.env.NEXT_PUBLIC_MAIL ? process.env.NEXT_PUBLIC_MAIL : ''}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : ''}/public/content/KronfortBannerSocial.jpg`,
          alt: 'Kronfort - рай, а не жилой комплекс!',
          width: 1850,
          height: 1000
        },
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : ''}/public/content/KronfortBannerSecond.png`,
          alt: 'Kronfort - рай, а не жилой комплекс!',
          width: 1080,
          height: 1080
        }
        // {
        //   url: 'https://localhost:3000/public/content/openGraphBanner1200ON600',
        //   alt: 'Изображение жилого квартара Кронфорт',
        //   width: 1200,
        //   height: 670
        // },
        // {
        //   url: 'https://localhost:3000/public/content/openGraphBannerSecond1200ON600.png',
        //   alt: 'Изображение кластера Кронфорт',
        //   width: 1200,
        //   height: 700
        // }
      ]
    }
  }
}

export default function Home() {
  return <MapPage />
}
