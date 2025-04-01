"use client"
import { useEffect, useRef, useState } from 'react'
import styles from './tiles.module.scss'

import Star from '@icon/star.svg'
import M from '@icon/м..svg'
import M2 from '@icon/м2.svg'

const Tiles = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 } // Анимация сработает, когда 30% блока появится в зоне видимости
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
    <section className={styles['tiles-wrapper']} ref={sectionRef}>
      <div className={`${styles['wrapper']} ${styles['main-wrapper']}`}>
        <div className={`${styles['tile']} ${styles['tile-bg1']} ${isVisible ? styles.visible : ''}`}>
          <p className={styles['title']}>Система видеонаблюдения</p>
          <p className={styles['description']}>пожаротушение с автоматическими датчиками</p>
        </div>
        <div className={`${styles['wrapper']} ${styles['column']}`}>
          <div className={styles['wrapper']}>
            <div className={`${styles['tile']} ${styles['tile-bg2']} ${isVisible ? styles.visible : ''}`}>
              <p className={styles['title']}>система защиты</p>
              <p className={styles['description']}>
                Защищенные электронные ключи, общий коридор с системами контроля доступа
              </p>
            </div>
            <div className={`${styles['tile']} ${styles['tile-bg3']} ${isVisible ? styles.visible : ''}`}>
              <p className={styles['title']}>
                3,8 <M />
              </p>
              <p className={styles['description']}>Высота потолков</p>
            </div>
          </div>
          <div className={`${styles['tile']} ${styles['tile-bg4']} ${isVisible ? styles.visible : ''}`}>
            <p className={styles['title']}>
              2,89 - 6,15 <M2 />
            </p>
            <p className={styles['description']}>площадь кладовых</p>
            <div className={styles['icon-wrapper']}>
              <Star />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tiles
