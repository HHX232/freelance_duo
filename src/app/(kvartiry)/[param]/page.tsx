import Header from "@shared/page/header/Header";
import Footer from "@shared/page/footer/footer";
import { MainContainer } from "@shared/containers/main/main-container";
import CatalogPageWrapper from "@pages/catalog/catalog.page";
import { getFlatsAll } from "@src/actions/flats";
import { getFilters } from "@src/actions/filters";
import { Metadata } from "next";
import { notFound } from "next/navigation"; // Для возврата ошибки 404

const validParams = [
  'kvartiry-s-garderobnoi',
  'kvartiry-s-kladovoi',
  'kvartiry-s-razdelnym-su',
  'kvartiry-s-terrasoi',
  'kvartiry-s-balkonom',
  'kvartiry-s-lodzhiei',
  'odnokomnatnye',
  'dvuhkomnatnye',
  '3-komnatnye',
  'studii',
  'lofty'
];

export async function generateMetadata({ params }: { params: { param: string } }): Promise<Metadata> {

  let title = '';
  let description = '';

  // Если параметр не является одним из допустимых
  if (!validParams.includes(params.param)) {
    return notFound();
  }

  switch (params.param) {
    case 'kvartiry-s-garderobnoi':
      title = 'Квартиры с большой гардеробной – купить в ЖК «Кронфорт», Кронштадт';
      description = 'Купить однокомнатные и двухкомнатные квартиры с гардеробной в ЖК «Кронфорт» от застройщика; выбрать планировки квартир с гардеробной по выгодной цене в строящемся доме в Кронштадте, 40 мин от Санкт-Петербурга';
      break;
    case 'kvartiry-s-kladovoi':
      title = 'Квартиры с кладовой – купить в ЖК «Кронфорт», Кронштадт';
      description = 'Купить квартиры с кладовой в строящемся доме от застройщика; продажа квартир с кладовыми по выгодным ценам в новостройке ЖК «Кронфорт», Кронштадт, в 40 мин от Санкт-Петербурга';
      break;
    case 'kvartiry-s-razdelnym-su':
      title = 'Квартиры с раздельным санузлом – купить в ЖК «Кронфорт», Кронштадт';
      description = 'Купить однокомнатную, двухкомнатную квартиру с раздельным санузлом в новостройке ЖК «Кронфорт»; продажа квартир с раздельным санузлом в строящемся доме по выгодным ценам в Кронштадте, 40 мин от Санкт-Петербурга';
      break;
    case 'kvartiry-s-terrasoi':
      title = 'Квартиры с терассой – купить в строящемся доме ЖК «Кронфорт», Кронштадт';
      description = 'Купить квартиры с просторной терассой в новостройке от застройщика, уникальные квартиры с открытой площадкой для отдыха с видом на залив в ЖК «Кронфорт», Кронштадт, 40 мин от Санкт-Петербурга.';
      break;
    case 'kvartiry-s-balkonom':
      title = 'Квартиры с балконом – купить в строящемся доме ЖК «Кронфорт», Кронштадт';
      description = 'Купить квартиру с балконом в новостройке от застройщика; продажа квартир с большим балконом с видом на залив в ЖК «Кронфорт», Кронштадт, в 40 мин от Санкт-Петербурга.';
      break;
    case 'kvartiry-s-lodzhiei':
      title = 'Квартиры с лоджией – купить в строящемся доме ЖК «Кронфорт», Кронштадт';
      description = 'Купить квартиру с большой лоджией в новостройке от застройщика; продажа квартир с лоджиями по выгодной цене в ЖК «Кронфорт», Кронштадт, в 40 мин от Санкт-Петербурга.';
      break;
      case 'odnokomnatnye':
        title = 'Купить однокомнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт';
        description = 'Выбрать и купить 1-комнатную квартиру комфорт-класса в строящемся доме квартала «Кронфорт Центральный», продажа однокомнатных квартир в новостройках по цене от 12 млн руб в Кронштадте недалеко от Острова фортов, 60 мин от СПб';
        break;
    case 'dvuhkomnatnye':
      title = 'Купить двухкомнатную квартиру комфорт-класса в ЖК «Кронфорт Центральный», Кронштадт';
      description = 'Купить двухкомнатную квартиру в новостройке комфорт-класса ЖК «Кронфорт Центральный», продажа двухкомнатных квартир в строящемся доме от 16 млн руб. в Кронштадте недалеко от Острова фортов, 60 мин от СПБ.';
      break;
    case '3-komnatnye':
      title = 'Трёхкомнатные квартиры от застройщика купить в ЖК «Кронфорт», Кронштадт';
      description = 'Купить 3-комнатную квартиру со свободной планировкой по выгодной цене напрямую от застройщика, продажа трешек на этапе строительства в 40 мин езды от Санкт-Петербурга в ЖК «Кронфорт», Кронштадт.';
      break;
      case 'studii':
        title = 'Квартиры-студии купить от застройщика в ЖК «Кронфорт», Кронштадт';
        description = 'Купить квартиру студию в новостройке от застройщика по выгодным ценам; продажа студий  на этапе строительства в 40 минутах езды от Санкт-Петербурга в ЖК «Кронфорт» в Кронштадте.';
        break;
    case 'lofty':
      title = 'Купить квартиру-лофт в ЖК «Кронфорт Центральный», Кронштадт';
      description = 'Купить квартиру в стиле лофт со свободной планировкой в новостройке комфорт-класса ЖК «Кронфорт Центральный», продажа квартир лофтов в строящемся доме от 23 млн рублей недалеко от Острова фортов в Кронштадте, 60 мин от СПб.'
      break;
  }

  const canonicalUrl = new URL(`/${params.param}`, process.env.NEXT_PUBLIC_SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    }
  };
}

export default async function Kvartiry({ params }: { params: { param: string } }) {

  // Если параметр не является допустимым, вернуть страницу 404
  if (!validParams.includes(params.param)) {
    return notFound();
  }

  const data = await getFlatsAll();
  const filters = await getFilters();

  // Установим id в зависимости от параметра
  const id = ['odnokomnatnye', 'dvuhkomnatnye', '3-komnatnye', 'studii'].includes(params.param)
    ? params.param
    : undefined;

  return (
    <>
      <Header />
      <main>
        <MainContainer>
          <CatalogPageWrapper data={data} filters_data={filters} param={params.param} id={id} />
        </MainContainer>
      </main>
      <Footer />
    </>
  );
}
