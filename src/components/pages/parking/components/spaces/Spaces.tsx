'use client'
import styles from './spaces.module.scss'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import {useEffect, useRef, useState} from 'react'

const Spaces = () => {
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
    <div className={styles['block-wrapper']} ref={sectionRef}>
      <div className={`${styles['title']} ${isVisible ? styles.visible : ''}` }>Парковочные места</div>
      <div className={`${styles['tiles-wrapper']} ${styles['tiles-main-wrapper']}`}>
        <div className={`${styles['tiles-wrapper']} ${styles['column']}`}>
          <div className={`${styles['tiles-wrapper']} ${styles['num-col-wrapper']}`}>
            <div className={`${styles['tile']} ${styles['bg-1']} ${styles['num_info']} ${isVisible ? styles.visible : ''}`}>
              <div className={`${styles['title_num']}`}>74</div>
              <div className={`${styles['desc']}`}>парковочных места</div>
            </div>
            <div className={`${styles['tile']} ${styles['bg-2']} ${styles['num_info']} ${isVisible ? styles.visible : ''}`}>
              <div className={`${styles['title_num']}`}>7</div>
              <div className={`${styles['desc']}`}>адаптированных для маломобильных групп</div>
            </div>
          </div>
          <div className={`${styles['tile']} ${styles['bg-3']} ${isVisible ? styles.visible : ''}`}>
            <div className={`${styles['text_wrapper']}`}>
              <div className={`${styles['title_text']}`}>места хватит всем</div>
              <div className={`${styles['desc']}`}>Места для автомобилей, мотоциклов и велосипедов</div>
            </div>
            <div className={`${styles['button_wrapper']} ${isVisible ? styles.visible : ''}`}>
              <FullButton
                type={'Button'}
                buttonText={'Подобрать Парковку'}
                activeButton={true}
                border={false}
                borderColor={'none'}
                extraClass={styles.button}
                buttonFill='bronze-500'
                buttonElementColor='white'
                buttonBorderRadius={'6px'}
                alternativeBorderOnActive
                alternativeBorderColor='bronze'
                alternativeBorderWidth='3px'
              />
            </div>
          </div>
        </div>
        <div className={`${styles['tile']} ${styles['bg-4']} ${isVisible ? styles.visible : ''}`}>
          <div className={`${styles['title_text']}`}>Инфраструктура</div>
          <div className={`${styles['desc']}`}>для установки зарядных станций электромобилей.</div>
        </div>
      </div>
    </div>
  )
}

export default Spaces
