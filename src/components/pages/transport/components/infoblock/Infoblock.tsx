'use client'

import styles from './Infoblock.module.scss'
import {useEffect, useRef, useState} from 'react'

const Infoblock = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
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
    <section className={styles['comfort-wrapper']} ref={sectionRef}>
      <div className={`${styles['info-wrapper']} ${styles.unVisible} ${isVisible ? styles.visible : ''}`}>
        <div className={styles['info']}>
          <div className={styles['title']}>Преимуществa инфраструктуры</div>

          <div className={styles['table-desc-wrapper']}>
            <p className={styles['description']}>
              Для развития потенциала Кронштадта создается комплекс инфраструктуры: многофункциональные общественные
              пространства, социальные, научные и образовательные объекты, которые обеспечат высокий уровень качества
              городской среды. Современные объекты призваны открыть дополнительные возможности для жителей и туристов.
            </p>
          </div>
        </div>
      </div>

      <div className={`${styles['desc-wrapper']} ${styles.unVisible} ${isVisible ? styles.visible : ''}`}>
        <p className={styles['description']}>
          Для развития потенциала Кронштадта создается комплекс инфраструктуры: многофункциональные общественные
          пространства, социальные, научные и образовательные объекты, которые обеспечат высокий уровень качества
          городской среды. Современные объекты призваны открыть дополнительные возможности для жителей и туристов.
        </p>
      </div>
    </section>
  )
}

export default Infoblock
