import {Reservation} from '@pages/dashboard/reservation/reservation'
import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Бронь',
    description: 'Бронь'
  }
}

export default function ReservationPage() {
  return (
    <>
      <Header dashboard={{information: true, selection: true}} />
      <main>
        <Reservation />
      </main>
      <Footer dashboard={true} />
    </>
  )
}
