import Header from '@shared/page/header/Header'

export default function NewsLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
