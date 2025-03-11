'use client'
import {Suspense} from 'react'
import styles from './Areas.module.scss'
import CornerSVG from '@icons/corner.svg'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'

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
          <div className={styles.captions}>
            <h2 className={styles['captions-title']}>
              От Уютных студий <br /> до просторных лофтов
            </h2>
            <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
              <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>&#62;3</span> м
                </h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>высота потолков</p>
              </div>
              <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>24-100</span> м2
                </h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>площадь квартир</p>
              </div>
              <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>10</span>
                </h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>корпусов в проекте</p>
              </div>
            </div>
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
