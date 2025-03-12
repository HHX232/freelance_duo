'use client'
import {Suspense, useEffect, useState} from 'react'
import styles from './Transport.module.scss'
import CornerSVG from '@icons/corner.svg'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
import clsx from 'clsx'

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

  const [mapIsActive, setMapIsActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const action = (e: MouseEvent) => {
      //@ts-ignore
      if (e.target.id === 'MapWrapper') return setMapIsActive(true)

      //@ts-ignore
      if (e?.target?.localName === 'iframe') return
      setMapIsActive(false)
    }

    window.addEventListener('click', action)

    return () => {
      window.removeEventListener('click', action)
    }
  })

  return (
    <div>
      {
        <section id='MapWrapper' className={styles.section}>
          <iframe
            className={clsx(mapIsActive ? styles.mapIsActive : '', styles.map)}
            src='https://yandex.ru/map-widget/v1/?um=constructor%3Ac0b8ef20c1a292fb67601e097be7374975c9a1f18327bc55a43516c3e5155808&amp;source=constructor'
            width='100%'
            height='100%'
          ></iframe>
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
