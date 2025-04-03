"use client"
import { useEffect, useRef, useState } from 'react'
import styles from './comfort.module.scss'
import DownloadButton from '@src/components/UI-kit/BaseControls/buttons/old/downloadButton'

const Comfort = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 } // Анимация сработает, когда 30% блока появится в зоне видимости
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
      <div className={`${styles['info-wrapper']} ${isVisible ? styles.visible : ''}`}>
        <div className={styles['title']}>удобство хранения на территории комплекса</div>
        <div className={styles.innerWrapper}>
          <p className={styles['description']}>
            Индивидуальные кладовые различных размеров от 2,89 до 6,15 кв.м, расположенные на — 1 этаже дома, с общим
            коридором и системами контроля доступа и пожаротушения.
          </p>

          <div className={styles['table-img-wrapper']}></div>

          <div className={styles['download-wrapper']}>
            <DownloadButton />
          </div>
        </div>
      </div>

      <div className={styles['img-wrapper']}></div>
    </section>
  )
}

export default Comfort
