import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'

export default function NewsLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
