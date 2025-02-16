import Header from '@shared/page/header/Header'
import Footer from '@shared/page/footer/footer'

export default function NewsLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
