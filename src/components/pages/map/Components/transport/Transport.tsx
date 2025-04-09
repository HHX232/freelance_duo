'use client'
import {Suspense, useRef} from 'react'
import styles from './Transport.module.scss'
// import CornerSVG from '@icons/corner.svg'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
// import clsx from 'clsx'
import TextAccentBlockUI from '@src/components/UI-kit/Text-Blocks/TextAccentBlockUI/TextAccentBlockUI'
import TransportMap from '@src/components/UI-kit/transportMap/transportMap'
import {mapRoutes} from '@src/lib/utils/catalog/mapMockData'

// const mobileSlides: React.ReactNode[] = [
//   <TextAccentBlockUI
//     key={1233}
//     theme='dark'
//     textTitle='КАД'
//     hideSubTitle
//     hideMainContent
//     textSubTitle=''
//     textMainContent=''
//   />,
//   <TextAccentBlockUI
//     theme='dark'
//     textSubTitle='Кронштадтское шоссе'
//     hideTitle
//     textTitle=''
//     extraUnderlineClass={styles.under_class}
//     hideMainContent
//     textMainContent=''
//     key={2344}
//   />,
//   <TextAccentBlockUI
//     theme='dark'
//     textSubTitle='АВТОБУС'
//     textTitle='256'
//     hideMainContent
//     textMainContent=''
//     key={3455}
//   />,
//   <TextAccentBlockUI
//     theme='dark'
//     textSubTitle='АВТОБУС'
//     textTitle='382'
//     hideMainContent
//     textMainContent=''
//     key={4566}
//   />
// ]

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
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const customPoi = [{ coords: [59.999664, 29.746338], name: "Кронфорт", icon: 'kf_green_icon.svg' }]

  return (
    <div>
      {
        <section id='MapWrapper' className={styles.section} ref={sectionRef}>
          <div className={styles.overflow} />
          <TransportMap customRoutes={mapRoutes} customPoi={customPoi} wrapperClass={styles.map} withLegend={false} withPoi withRouteButtons />
          <div className={`${styles.captions}`}>
            <h2 className={styles['captions-title']}>Транспортная доступность</h2>
            <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
              {/* <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>КАД</span>
                </h2>
                <hr className={styles['caption__divider']} />
              </div> */}
              <TextAccentBlockUI
                theme='dark'
                textTitle='КАД'
                hideSubTitle
                hideMainContent
                textSubTitle=''
                textMainContent=''
              />
              {/* <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>Кронштадтское шоссе</h2>
                <hr className={styles['caption__divider']} />
              </div> */}
              <TextAccentBlockUI
                theme='dark'
                textSubTitle='Кронштадтское шоссе'
                hideTitle
                textTitle=''
                // extraUnderlineClass={styles.under_class}
                hideMainContent
                textMainContent=''
              />
              {/* <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>256</span>автобус
                </h2>
                <hr className={styles['caption__divider']} />
              </div> */}
              <TextAccentBlockUI
                theme='dark'
                textSubTitle='АВТОБУС'
                textTitle='256'
                hideMainContent
                textMainContent=''
              />
              {/* <div className={styles['caption']}>
                <CornerSVG />
                <h2 className={styles['caption__title']}>
                  <span>382</span> автобус
                </h2>
                <hr className={styles['caption__divider']} />
              </div> */}
              <TextAccentBlockUI
                theme='dark'
                textSubTitle='АВТОБУС'
                textTitle='382'
                hideMainContent
                textMainContent=''
              />
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
