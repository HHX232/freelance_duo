'use client'
import {Suspense} from 'react'
import styles from './Areas.module.scss'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import TextAccentBlockUI from '@src/components/UI-kit/Text-Blocks/TextAccentBlockUI/TextAccentBlockUI'

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

  return (
    <div>
      {
        <section className={styles.section}>
          <h2 className={styles['captions-title']}>
            От Уютных студий <br /> до просторных лофтов
          </h2>
          <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
            <TextAccentBlockUI
              extraContainerClass={styles.max_width}
              textTitle='>3'
              textSubTitle='М'
              textMainContent='высота потолков'
            />
            <TextAccentBlockUI
              extraContainerClass={styles.max_width}
              textTitle='24-100'
              textSubTitle='м2'
              textMainContent='площадь квартир'
            />
            <TextAccentBlockUI
              extraContainerClass={styles.max_width}
              textTitle='10'
              textSubTitle=''
              hideSubTitle
              textMainContent='корпусов в проекте'
            />
          </div>
          <div className={`${styles['caption-items']} ${styles['mobile_captions']}`}>
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
