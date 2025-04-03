'use client'
import styles from './Information.module.scss'
import DownloadButton from '@src/components/UI-kit/BaseControls/buttons/old/downloadButton'
import {useEffect, useRef, useState} from 'react'

const Information = () => {
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
          <div className={styles['title']}>Новые дороги для комфортного будущего</div>

          <div className={styles['table-desc-wrapper']}>
            <p className={styles['description']}>
              Проект «Кронфорт» — часть туристско - рекреационного кластера «Остров фортов», реализация которого
              предусматривает строительство новых дорог, расширение и реконструкцию существующих магистралей Кронштадта.
              Их ввод в эксплуатацию создаст условия для комфортного движения автотранспорта в городе на ближайшие
              два-три десятилетия.
            </p>
          </div>
        </div>

        <div className={styles['download-wrapper']}>
          <DownloadButton />
        </div>
      </div>

      <div className={`${styles['desc-wrapper']} ${styles.unVisible} ${isVisible ? styles.visible : ''}`}>
        <p className={styles['description']}>
          Проект «Кронфорт» — часть туристско - рекреационного кластера «Остров фортов», реализация которого
          предусматривает строительство новых дорог, расширение и реконструкцию существующих магистралей Кронштадта. Их
          ввод в эксплуатацию создаст условия для комфортного движения автотранспорта в городе на ближайшие два-три
          десятилетия.
        </p>
      </div>
    </section>
  )
}

export default Information
