import ApartmentCard from '@pages/apartment-card/ApartmentCard.page'
import {Metadata} from 'next'
import {ApartmentCardPageParams} from './model'
import {parseData} from './data'
import {getFlatsById, getPdf, getReservation} from '@src/actions/flats'
import Header from '@shared/pageDefault/header/Header'
export const revalidate = 3600

export async function generateMetadata({params}: ApartmentCardPageParams): Promise<Metadata> {
  const fetch = await getFlatsById([params.id])
  const parsedData = parseData(fetch[0])

  const cost = new Intl.NumberFormat('ru').format(+parsedData.fvalue)

  let title = ''
  let description = ''

  switch (parsedData.type) {
    case '1-комнатная':
      title = `Купить однокомнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт.`
      description = `Купить 1-комнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный». Площадь: ${parsedData.tsquare} м². Цена: ${cost} руб. Этаж: ${parsedData.floor}, корпус ${parsedData.building}. Срок сдачи: ${parsedData.ready}. Квартира с ${parsedData.attributes.join(', ')}.`
      break
    case '2-комнатная':
      title = 'Купить двухкомнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт'
      description = `Купить 2-комнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный». Площадь: ${parsedData.tsquare} м². Цена: ${cost} руб. Этаж: ${parsedData.floor}, корпус ${parsedData.building}. Срок сдачи: ${parsedData.ready}. Квартира с ${parsedData.attributes.join(', ')}.`
      break
    case '3-комнатная':
      title = 'Купить трёхкомнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт'
      description = `Купить 3-комнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный». Площадь: ${parsedData.tsquare} м². Цена: ${cost} руб. Этаж: ${parsedData.floor}, корпус ${parsedData.building}. Срок сдачи: ${parsedData.ready}. Квартира с ${parsedData.attributes.join(', ')}.`
      break
    case 'Студия':
      title = 'Купить квартиру-студию комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт'
      description = `Купить квартиру-студию комфорт-класса в ЖК «Кронфорт Центральный». Площадь: ${parsedData.tsquare} м². Цена: ${cost} руб. Этаж: ${parsedData.floor}, корпус ${parsedData.building}. Срок сдачи: ${parsedData.ready}. Квартира с ${parsedData.attributes.join(', ')}.`
      break
    default:
      title = `${parsedData.type} - ${parsedData.tsquare} м² в ЖК «Кронфорт Центральный»`
      description = `Купить квартиру ${parsedData.type} в ЖК «Кронфорт Центральный». Площадь: ${parsedData.tsquare} м². Цена: ${cost} руб. Этаж: ${parsedData.floor}, корпус ${parsedData.building}. Срок сдачи: ${parsedData.ready}. Квартира с ${parsedData.attributes.join(', ')}.`
      break
  }

  const canonicalUrl = new URL(`/apartment-card/${params.id}`, process.env.NEXT_PUBLIC_SITE_URL).toString()

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      images: [
        {
          url: parsedData.images[0],
          width: 500,
          height: 500,
          alt: `План квартиры ${parsedData.type} в ЖК «Кронфорт Центральный»`
        }
      ]
    }
  }
}

export default async function ApartmentCardPage({params}: ApartmentCardPageParams) {
  const fetch = await getFlatsById([params.id])
  const parsedData = parseData(fetch[0])

  const isAllow = await getReservation(parsedData.ext_guid, parsedData.fvalue, parsedData.fprice)

  const pdf = await getPdf({guid: parsedData.ext_guid})

  console.log('parsedData', parsedData)
  console.log('parsedData.rvalue', parsedData.rvalue)

  return (
    <>
      <Header />
      <main>
        <ApartmentCard {...parsedData} id={params.id} isAllow={isAllow} pdf={pdf.pdf_path} />
      </main>
    </>
  )
}
