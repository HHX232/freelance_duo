import {Metadata} from 'next'
import MapPage from '@pages/map/Map'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Кронфорт – новые жилые кварталы в Кронштадте от застройщика ГК «Алькор»',
    description:
      'Новый малоэтажный квартал «Кронфорт» в Кронштадте от застройщика ГК «Алькор», жилой квартал находится на побережье Финского залива и входит в систему Острова фортов, старт продаж квартир – 1 квартал 2024 года.',
    alternates: {
      canonical: new URL('/', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default function Map() {
  return <MapPage />
}
