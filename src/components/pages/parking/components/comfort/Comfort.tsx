'use client'
import styles from './comfort.module.scss'
import DownloadButton from '@src/components/UI-kit/BaseControls/buttons/old/downloadButton'
import {useEffect, useRef, useState} from 'react'

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
    <section className={styles['comfort-wrapper']} ref={sectionRef}>
      <div className={`${styles['info-wrapper']} ${isVisible ? styles.visible : ''}`}>
        <div className={styles['info']}>
          <div className={styles['title']}>Комфорт и безопасность на высшем уровне</div>

          <div className={`${styles['table-desc-wrapper']}`}>
            <p className={styles['description']}>
              В каждом корпусе пре дусмотрен подземный паркинг для автомобилей и мотоциклов с доступом из лифтов жилой
              части дома. Также здесь будет размещена велопарковка.
            </p>
            <br />
            <p className={styles['description']}>
              Проведена подготовка под установку зарядных станций для электромобилей. В подземной части каждого корпуса
              для жильцов будут доступны индивидуальные кладовые различных размеров.
            </p>
          </div>
        </div>

        <div className={styles['download-wrapper']}>
          <DownloadButton />
        </div>
      </div>

      <div className={`${styles['desc-wrapper']} ${isVisible ? styles.visible : ''}`}>
        <p className={styles['description']}>
          В каждом корпусе пре дусмотрен подземный паркинг для автомобилей и мотоциклов с доступом из лифтов жилой части
          дома. Также здесь будет размещена велопарковка.
        </p>
        <br />
        <p className={styles['description']}>
          Проведена подготовка под установку зарядных станций для электромобилей. В подземной части каждого корпуса для
          жильцов будут доступны индивидуальные кладовые различных размеров.
        </p>
      </div>
    </section>
  )
}

export default Comfort
