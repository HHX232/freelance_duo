'use client'
import { useEffect, useRef, useState } from 'react'
import styles from '@pages/storerooms/components/head/Head.module.scss'
import Breadcrumbs from '@src/components/UI-kit/Navigation/Breadcrumbs/Breadcrumbs'

const Head = () => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/'},
    {
      title: 'Кладовые',
      href: '/storerooms'
    }
  ]
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
      <section className={`${styles['head-wrapper']}`} ref={sectionRef}>
        <div>
          <Breadcrumbs
            items={breadcrumbItems}
            darkTheme={true}
            className={styles['router']}
            iconStyles={styles.routerIcon}
          />
        </div>
        <div className={`${styles['text-wrapper']} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.title}>Кладовые</div>
          <div className={styles.description}>
            Современные помещения для хранения личных вещей с круглосуточным доступом и высоким уровнем безопасности.
          </div>
        </div>
      </section>
    </div>
  )
}

export default Head
