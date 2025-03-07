'use client'
import {Suspense} from 'react'
import styles from './Transport.module.scss'
import CornerSVG from '@icons/corner.svg'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'

const TransportContent = () => {
  const mobileSlides: React.ReactNode[] = [
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={666}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>
          <span>Кад</span>
        </h2>
        <hr className={styles['caption__divider']} />
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={313}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>Кронштадтское шоссе</h2>
        <hr className={styles['caption__divider']} />
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={777}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>
          <span>256</span> автобус
        </h2>
        <hr className={styles['caption__divider']} />
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={414}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>
          <span>382</span> автобус
        </h2>
        <hr className={styles['caption__divider']} />
      </div>
    </div>
  ]

  return (
    <div>
      {
        <section className={styles.section}>
          <div className={styles.captions}>
            <h2 className={styles['captions-title']}>Транспортная доступность</h2>
            <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
              <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>КАД</span>
                </h2>
                <hr className={styles['caption__divider']} />
              </div>
              <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>Кронштадтское шоссе</h2>
                <hr className={styles['caption__divider']} />
              </div>
              <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>256</span>автобус
                </h2>
                <hr className={styles['caption__divider']} />
              </div>
              <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>382</span> автобус
                </h2>
                <hr className={styles['caption__divider']} />
              </div>
            </div>
            <div className={`${styles['caption-items']} ${styles['mobile_captions']}`}>
              <PhoneSlider
                embalaContainerClassName={styles.phone_slider_container}
                sliderWrapperClassName={styles.phone_slider_wrapper}
                viewportIsShow
                options={{dragFree: true}}
                slides={mobileSlides}
              />
            </div>
          </div>
        </section>
      }
    </div>
  )
}

const TransportPage = () => {
  return (
    <Suspense>
      <TransportContent />
    </Suspense>
  )
}

export default TransportPage
