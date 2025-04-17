"use client"
import styles from './design.module.scss'
import Lamp from '@icon/lamp.svg'
import Cursor from '@icon/cursor.svg'
import Rubick from '@icon/rubick.svg'
import Shower from '@icon/shower.svg'
import Guard from '@icon/guard.svg'
import { useEffect, useRef, useState } from 'react'
import { useIsMaxWidth } from '@utils/useIsMobile'

const Design = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMaxWidth(768);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {

        //бывает не работает если блок слишком длинный на мобилках, надо уменьшать threshold
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: isMobile ? 0.05 : 0.5 }
    )

    if (sectionRef.current) {
      console.log('OBSERVER');
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isMobile])

  return (
    <div className={styles['block-wrapper']} ref={sectionRef}>
      <div className={styles['title-wrapper']}>
        <div className={`${styles['title']} ${isVisible ? styles.visible : ''}`}>Внутреннее оформление</div>
      </div>

      <div className={styles['tiles-wrapper']}>
        <div className={styles['first-line']}>
          <div className={`${styles['tile']} ${styles['bg1']} ${isVisible ? styles.visible : ''}`}>
            <Lamp />
            <div className={styles.tile_text}>Централизованное освещение</div>
          </div>
          <div className={`${styles['tile']} ${styles['bg2']} ${isVisible ? styles.visible : ''}`}>
            <Cursor />
            <div className={styles.tile_text}>Цементная стяжка с противоскользящим покрытием</div>
          </div>
        </div>
        <div className={styles['second-line']}>
          <div className={`${styles['tile']} ${isVisible ? styles.visible : ''}`}>
            <Rubick />
            <div className={styles.tile_text}>Металлическая сетка и бетонные панели</div>
          </div>
          <div className={`${styles['tile']} ${isVisible ? styles.visible : ''}`}>
            <Shower />
            <div className={styles.tile_text}>Потолок без отделки</div>
          </div>
          <div className={`${styles['tile']} ${styles['bg5']} ${isVisible ? styles.visible : ''}`}>
            <Guard />
            <div className={styles.tile_text}>Усиленные стальные двери с защитой от взлома</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Design
