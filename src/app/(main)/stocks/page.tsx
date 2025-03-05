import {StocksList} from '@pages/stock/list'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Акции – ЖК «Кронфорт», Кронштадт',
    description: ''
  }
}

const StocksPage = () => {
  return <StocksList />
}

export default StocksPage
