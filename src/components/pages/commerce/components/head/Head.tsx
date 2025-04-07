'use client'
import styles from './Head.module.scss'
import Breadcrumbs from '@src/components/UI-kit/Navigation/Breadcrumbs/Breadcrumbs'
import {useEffect, useRef, useState} from 'react'

const Head = () => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/'},
    {
      title: 'Коммерческие помещения',
      href: '/commerce'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className={`${styles['head-wrapper']}`} ref={sectionRef}>
      <div>
        <Breadcrumbs items={breadcrumbItems} darkTheme={true} className={styles['router']} />
      </div>
      <div className={`${styles['text-wrapper']} ${ isVisible ? styles.visible : ''}`}>
        <div className={styles.title}>
          Коммерческие <br /> помещения
        </div>
      </div>
    </section>
  )
}

export default Head
