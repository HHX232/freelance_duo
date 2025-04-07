'use client'
import styles from './Access.module.scss'
import CircleLineDivider from '@shared/circleLineDivider/CircleLineDivider'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import ButtonTextUI from '@src/components/UI-kit/Text-Elements/Typography/Button/ButtonText'
import {useEffect, useRef, useState} from 'react'

const Access = () => {

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])


  return (
    <div className={`${styles['wrapper']}`} ref={sectionRef}>
      <div className={styles['image']}></div>
      <div className={`${styles['content']}`}>
        <div className={`${styles['title-wrapper']} ${isVisible ? styles.visible : ''}`}>
          <div className={styles['title']}>Въезд и доступ на паркинг</div>

          <div className={styles['DesktopButton']}>
            <FilledButton
              style={{
                background: 'rgba(255, 255, 255, 0.16)',
                border: 'none',
                padding: '12px 36px'
              }}
            >
              <ButtonTextUI extraStyle={{color: '#fff'}} size='md'>
                ПОДОБРАТЬ парковку
              </ButtonTextUI>
            </FilledButton>
          </div>
        </div>
        <div className={`${styles['tiles']} ${isVisible ? styles.visible : ''}`}>
          <div className={`${styles['column']}`}>
            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Круглосуточное видеонаблюдение</div>
                <div className={styles['desc']}>с охватом всей территории</div>
              </div>
            </div>

            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Системы контроля</div>
                <div className={styles['desc']}>доступа на въездах и выездах</div>
              </div>
            </div>
          </div>

          <div className={`${styles['column']}`}>
            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Автоматизированные ворота</div>
                <div className={styles['desc']}>с дистанционным управлением</div>
              </div>
            </div>

            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Многоуровневая система контроля</div>
                <div className={styles['desc']}>доступа с использованием электронных брелоков</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles['TableButtonWrapper']} ${isVisible ? styles.visible : ''}`}>
          <FilledButton style={{background: 'rgba(255, 255, 255, 0.16)', border: 'none'}}>
            ПОДОБРАТЬ парковку
          </FilledButton>
        </div>
      </div>
    </div>
  )
}

export default Access
