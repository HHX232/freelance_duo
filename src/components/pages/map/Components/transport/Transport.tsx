'use client'
import { Suspense } from 'react'
import styles from './Transport.module.scss'
import CornerSVG from '@icons/corner.svg'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'


const TransportContent = () => {

  const mobileSlides: React.ReactNode[] = [
    <div
      className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`}
      key={666}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>Кад</h2>
        <hr className={styles['caption__divider']} />
      </div>

      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>Кронштадтское шоссе</h2>
        <hr className={styles['caption__divider']} />
      </div>
    </div>,
    <div
      className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`}
      key={777}>
      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>256 автобус</h2>
        <hr className={styles['caption__divider']} />
      </div>

      <div className={`${styles['caption']}`}>
        <h2 className={styles['caption__title']}>382 автобус</h2>
        <hr className={styles['caption__divider']} />
      </div>

    </div>
  ]




  return (
    <div>
      {(
        <section className={styles.section}>
            <div className={styles.captions}>
              <h2 className={styles['captions-title']}>Транспортная доступность</h2>
              <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>КАД</h2>
                  <hr className={styles['caption__divider']} />
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}><span>Кронштадтское шоссе</span></h2>
                  <hr className={styles['caption__divider']} />
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>256<span>автобус</span></h2>
                  <hr className={styles['caption__divider']} />
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>382<span>автобус</span></h2>
                  <hr className={styles['caption__divider']} />
                </div>
              </div>
              <div className={`${styles['caption-items']} ${styles['mobile_captions']}`}>
                <PhoneSlider slides={mobileSlides}/>
              </div>

          </div>
        </section>
      )}
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
