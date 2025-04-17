'use client'
import {Suspense, useEffect, useRef, useState} from 'react'
import styles from './Areas.module.scss'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import TextAccentBlockUI from '@src/components/UI-kit/Text-Blocks/TextAccentBlockUI/TextAccentBlockUI'
import H3Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H3Title'

const AreasContent = () => {
  const mobileSlides: React.ReactNode[] = [
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']} ${styles.mobile_slide}`} key={7891}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>
          <span>&#62;3</span> м
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>высота потолков</p>
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']} ${styles.mobile_slide}`} key={74891}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>
          <span>24-100</span> м2
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>площадь квартир</p>
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']} ${styles.mobile_slide}`} key={222}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>
          <span>10</span>
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>корпусов в проекте</p>
      </div>
    </div>
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
      {threshold: 0.5}
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
    <div>
      {
        <section className={styles.section} ref={sectionRef}>
          {/* <h2 className={`${styles['captions-title']} ${isVisible ? styles.visible : ''}`}>
            От Уютных студий2 <br /> до просторных лофтов
          </h2> */}
          <H3Title extraClass={`${styles['captions-title']} ${isVisible ? styles.visible : ''}`}>
            От Уютных студий <br /> до просторных лофтов
          </H3Title>
          <div
            className={`${styles['caption-items']} ${styles['desktop_captions']} ${isVisible ? styles.visible : ''}`}
          >
            <TextAccentBlockUI
              extraContainerClass={styles.max_width}
              extraTitleClass={styles.text_font_weight_300}
              textTitle='>3'
              textSubTitle='М'
              textMainContent='высота потолков'
            />
            <TextAccentBlockUI
              extraContainerClass={styles.max_width}
              extraTitleClass={styles.text_font_weight_300}
              textTitle='24-100'
              textSubTitle='м2'
              textMainContent='площадь квартир'
            />
            <TextAccentBlockUI
              extraContainerClass={styles.max_width}
              extraTitleClass={styles.text_font_weight_300}
              textTitle='10'
              textSubTitle=''
              hideSubTitle
              textMainContent='корпусов в проекте'
            />
          </div>
          <div className={`${styles['caption-items']} ${styles['mobile_captions']} ${isVisible ? styles.visible : ''}`}>
            <PhoneSlider
              embalaContainerClassName={styles.phone_slider_container}
              sliderWrapperClassName={styles.phone_slider_wrapper}
              slideGap={0}
              options={{align: 'start'}}
              viewportIsShow
              slides={mobileSlides}
            />
          </div>
        </section>
      }
    </div>
  )
}

const AreasPage = () => {
  return (
    <Suspense>
      <AreasContent />
    </Suspense>
  )
}

export default AreasPage
