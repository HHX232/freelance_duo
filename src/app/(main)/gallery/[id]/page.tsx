import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {getProgressById} from '@src/actions/progress'
import {ProgressObj} from '@pages/progress/item/item'
import {Metadata} from 'next'

export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
  const progress = await getProgressById(params.id)

  return {
    title: progress.title,
    description: progress.meta_description,
    alternates: {
      canonical: new URL(`/gallery/${params.id}`, process.env.NEXT_PUBLIC_SITE_URL).toString()
    }
  }
}

export default async function ProgressObjectPage({params}: {params: {id: string}}) {
  const progress = await getProgressById(params.id)

  return (
    <>
      <Header />
      <main>
        <ProgressObj progress={progress} />
      </main>
      <Footer />
    </>
  )
}
