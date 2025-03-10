'use client'
import {Breadcrumb} from 'antd'
import Link from 'next/link'
import styles from './index.module.scss'
import {useRouter} from 'next/navigation'
import clsx from 'clsx'
import BackIcon from '@icons/back.svg'

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

const Breadcrumbs = ({items, darkTheme, className, isIconBack}: BreadcrumbsProps) => {
  const router = useRouter()

  return (
    <section className={clsx(styles.breadcrumbs, className, {[styles.dark]: darkTheme})}>
      <Link className={styles.mobile_version} href={'#'} onClick={() => router.back()}>
        <BackIcon className={iconStyles} />
        <span>{items.length >= 2 ? items[items.length - 2]?.title : 'Назад'}</span>
      </Link>
      <Breadcrumb className={styles.desktop_version} separator={<>|</>}>
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.back ? (
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
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </section>
  )
}

export default Breadcrumbs
