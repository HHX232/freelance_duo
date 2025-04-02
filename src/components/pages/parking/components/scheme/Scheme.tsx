'use client'

import styles from './Scheme.module.scss'
import SchemeIcon from '@icon/scheme.svg'
import SchemeDesctop from '@icon/scheme_desctop.svg'
import SchemeXXXL from '@icon/scheme_xxxl.svg'
import {useIsLg, useIsMinWidth} from '@utils/useIsMobile'
import DownloadButton from '@src/components/UI-kit/BaseControls/buttons/old/downloadButton'
import {useEffect, useRef, useState} from 'react'

const Scheme = () => {
  const isLg = useIsMinWidth(1024)
  const isXXXL = useIsMinWidth(1920)
  const isXl = useIsLg()


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
    <div className={styles.wrapper} ref={sectionRef}>
      <div className={`${styles.info} ${isVisible ? styles.visible: ''}`}>
        <div className={styles.title}>Схема типового этажа</div>
        <div className={styles['download-wrapper']}>
          <DownloadButton text={'Скачайте схему паркинга'} />
        </div>
      </div>
      <div className={`${styles.schemeWrapper} ${isVisible ? styles.visible: ''}`}>
        {isXl ? (
          isLg ? (
            <SchemeIcon className={styles.icon} />
          ) : (
            <SchemeIcon className={styles.icon} />
          )
        ) : isXXXL ? (
          <SchemeXXXL className={styles.icon} />
        ) : (
          <SchemeDesctop />
        )}
      </div>
    </div>
  )
}

export default Scheme
