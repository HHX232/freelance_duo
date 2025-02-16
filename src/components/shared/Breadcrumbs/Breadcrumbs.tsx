'use client'
import BreadcrumbSVG from '@icons/breadcrumb.svg'
import {Breadcrumb} from 'antd'
import Link from 'next/link'
import styles from './index.module.scss'
import {useRouter} from 'next/navigation'
import clsx from 'clsx'

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
}

const Breadcrumbs = ({items, darkTheme, className, dashboard}: BreadcrumbsProps) => {
  const router = useRouter()

  return (
    <section className={clsx(styles.breadcrumbs, className, {[styles.dark]: darkTheme})}>
      <button
        className={clsx(styles.backButton, dashboard ? styles.dashboard : '')}
        onClick={() => router.back()}
        title='Вернуться назад'
      >
        <BreadcrumbSVG width={14} height={14} />
      </button>
      <Breadcrumb separator={<>|</>}>
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
              <>{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </section>
  )
}

export default Breadcrumbs
