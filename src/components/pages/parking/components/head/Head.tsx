'use client'
import styles from './Head.module.scss'
import SaleBlock from '@shared/SaleBlock/SaleBlock'
import SalePIcon from '@icon/SaleP.svg'
import Breadcrumbs from '@src/components/UI-kit/Navigation/Breadcrumbs/Breadcrumbs'
import {useEffect, useRef, useState} from 'react'

const Head = () => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/'},
    {
      title: 'Паркинг',
      href: '/parking'
    }
  ]

  const isSale = true
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div>
      <section className={styles['head-wrapper']} ref={sectionRef}>
        <div className={styles.routerWrapper}>
          {/*<Title breadcrumbs={breadcrumbItems} dashboard={true} darkTheme={true} />*/}
          <Breadcrumbs
            items={breadcrumbItems}
            darkTheme={true}
            className={styles['router']}
            iconStyles={styles['routerIcon']}
          />
        </div>
        <div className={styles.container}>
          <div className={`${styles.title_wrap} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.head_title}>Паркинг</div>
            <p className={styles.description}>
              Современный паркинг с прямым доступом из жилых секций обеспечивает удобство и безопасность в ежедневной
              эксплуатации.
            </p>
          </div>
          {isSale && (
            <SaleBlock
              title={
                <div className={styles.sale_title}>
                  <div className={styles.sale_title_text}>скидка 10% </div>
                </div>
              }
              description={<div className={styles.sale_desc}>На парковку до 27 сентабря 2025</div>}
              icon={<SalePIcon className={styles.icon} />}
              extraClasses={`${styles['sale_wrapper']} ${isVisible ? styles.visible : ''}`}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Head
