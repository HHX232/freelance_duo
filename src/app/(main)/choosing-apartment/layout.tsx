import Header from '@shared/pageDefault/header/Header'

export default function NewsLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
