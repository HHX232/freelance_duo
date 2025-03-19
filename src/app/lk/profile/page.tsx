import {Profile} from '@pages/dashboard/profile/profile'
import Header from '@shared/page/header/Header'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Профиль',
    description: 'Профиль'
  }
}

export default function ProfilePage() {
  return (
    <>
      <Header dashboard={{information: true, selection: true}} />
      <main>
        <Profile />
      </main>
    </>
  )
}
