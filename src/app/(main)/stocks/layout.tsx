import Header from '@shared/pageDefault/header/Header'
import Footer from '@shared/pageDefault/footer/footer'
import {FC, PropsWithChildren} from 'react'
import {NewsletterForm} from '@shared/newsletter-form'

const StocksLayout: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <Header hideLogo />
      <main>{props.children}</main>
      <NewsletterForm />
      <Footer />
    </>
  )
}

export default StocksLayout
