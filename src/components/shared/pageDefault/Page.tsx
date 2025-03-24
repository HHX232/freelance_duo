'use client'
import styles from './Page.module.scss'
import clsx from 'clsx'
import Header from './header/Header'
import {PageProps} from './model'
import Footer from './footer/footer'

export default function Page({children, className}: PageProps) {
  return (
    <>
      <Header />
      <main className={clsx(styles.page, className)} id='page' style={{overflow: 'hidden'}}>
        <>{children}</>
      </main>
      <Footer />
    </>
  )
}
