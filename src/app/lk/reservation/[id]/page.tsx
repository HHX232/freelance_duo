import Header from '@shared/page/header/Header'
import {ReservationCreate} from '@pages/dashboard/reservation/create/reservation-create'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Данные для брони',
    description: 'Данные для брони'
  }
}

export default function ReservationDetailsPage({params}: {params: {id: string}}) {
  return (
    <>
      <Header dashboard={{information: true, selection: true}} />
      <main>
        <ReservationCreate id={params.id} />
      </main>
    </>
  )
}
