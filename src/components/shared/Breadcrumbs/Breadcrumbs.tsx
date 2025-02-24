'use client'
import { Breadcrumb } from 'antd'
import Link from 'next/link'
import styles from './index.module.scss'
import { useRouter } from 'next/navigation'
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

const Breadcrumbs = ({ items, darkTheme, className }: BreadcrumbsProps) => {
  const router = useRouter()

  return (
    <section className={clsx(styles.breadcrumbs, className, { [styles.dark]: darkTheme })}>
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
