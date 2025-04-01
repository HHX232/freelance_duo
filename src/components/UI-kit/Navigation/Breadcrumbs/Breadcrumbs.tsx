'use client'
import {Breadcrumb} from 'antd'
import Link from 'next/link'
import styles from './Breadcrumbs.module.scss'
import {useRouter} from 'next/navigation'
import clsx from 'clsx'
import BackIcon from '@icons/back.svg'
import {Golos_Text} from 'next/font/google'
import {useEffect, useState} from 'react'

const golos = Golos_Text({subsets: ['cyrillic']})

export interface BreadcrumbItem {
  title: string
  href?: string
  back?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  darkTheme?: boolean
  className?: string
  dashboard?: boolean
  iconStyles?: string
}

const Breadcrumbs = ({items, darkTheme, className, iconStyles}: BreadcrumbsProps) => {
  const router = useRouter()
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    //анимация появления
    setTimeout(() => {
      setStartAnimation(true)
    }, 500)
  })

  // Create items array for Ant Design's Breadcrumb component
  const breadcrumbItems = items.map((item, index) => ({
    key: index,
    title: item.back ? (
      <>
        {item.href ? (
          <Link href={'#'} onClick={() => router.back()}>
            {item.title}
          </Link>
        ) : (
          item.title
        )}
      </>
    ) : (
      <>
        {item.href ? (
          <Link href={item.href} className={styles.fitContent}>
            {item.title}
          </Link>
        ) : (
          item.title
        )}
      </>
    )
  }))

  return (
    <section className={clsx(styles.breadcrumbs, className, {[styles.dark]: darkTheme}, golos.className)}>
      <Link className={styles.mobile_version} href={'#'} onClick={() => router.back()}>
        <BackIcon className={iconStyles} />
        <span>{items.length >= 2 ? items[items.length - 2]?.title : 'Назад'}</span>
      </Link>
      <Breadcrumb className={`${styles.desktop_version}  ${startAnimation ? styles.visible : ''}`} items={breadcrumbItems} separator={<>|</>} />
    </section>
  )
}

export default Breadcrumbs
