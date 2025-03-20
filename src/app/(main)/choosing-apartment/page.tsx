import ChoosingApartmentPageView from '@pages/choosing-apartment/choosing.apartment';
import { Metadata, NextPage } from 'next';


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Выбор квартиры – ЖК «Кронфорт», Кронштадт',
    description: 'Добавить в избранное квартиры жилого комплекса «Кронфорт» в Кронштадте.',
    alternates: {
      canonical: new URL('/izbrannoe', process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

const ChoosingApartment: NextPage = (  ) => {


  return ( <ChoosingApartmentPageView /> )

}


export default ChoosingApartment