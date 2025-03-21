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
      title = 'Купить однокомнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт'
      description =
        'Выбрать и купить 1-комнатную квартиру комфорт-класса в строящемся доме квартала «Кронфорт Центральный», продажа однокомнатных квартир в новостройках по цене от 12 млн руб в Кронштадте недалеко от Острова фортов, 60 мин от СПб'
      break
    case '2-комнатная':
      title = 'Купить двухкомнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт'
      description =
        'Купить двухкомнатную квартиру в новостройке комфорт-класса ЖК «Кронфорт Центральный», продажа двухкомнатных квартир в строящемся доме от 16 млн руб. в Кронштадте недалеко от Острова фортов, 60 мин от СПБ.'
      break
    case '3-комнатная':
      title = 'Купить квартиру-лофт в ЖК «Кронфорт Центральный», Кронштадт'
      description =
        'Купить квартиру в стиле лофт со свободной планировкой в новостройке комфорт-класса ЖК «Кронфорт Центральный», продажа квартир лофтов в строящемся доме от 23 млн рублей недалеко от Острова фортов в Кронштадте, 60 мин от СПб.'
      break
    case 'Студия':
      title = 'Квартиры-студии купить от застройщика в ЖК «Кронфорт», Кронштадт'
      description =
        'Купить квартиру студию в новостройке от застройщика по выгодным ценам; продажа студий  на этапе строительства в 40 минутах езды от Санкт-Петербурга в ЖК «Кронфорт» в Кронштадте.'
      break
    default:
      title = `${parsedData.type} - ${parsedData.tsquare} м2 в ЖК «Кронфорт.Центральный»`
      description = `Квартира ${parsedData.type} - ${parsedData.tsquare} м2 в ЖК «Кронфорт.Центральный» купить по цене ${cost} руб.`
      break
  }

  const canonicalUrl = new URL(`/apartment-card/${params.id}`, process.env.NEXT_PUBLIC_SITE_URL).toString()

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
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
