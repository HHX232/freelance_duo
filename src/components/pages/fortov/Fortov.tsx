'use client'
import  {Suspense} from 'react'
import styles from './Fortov.module.scss'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'

const FortovContent = () => {
  const mobileSlides: React.ReactNode[] = [
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={1111}>
      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>
          <span>
            парк <br />
            «остров фортов»
          </span>
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>для активного отдыха и прогулок с детьми</p>
      </div>

      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>32</h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>комфортных общественных и социальных объекта инфраструктуры</p>
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={22222}>
      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>3</h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>объекта всемирного культурного наследия ЮНЕСКО</p>
      </div>
    </div>
  ]

  return (
    <div>
      {
        <section className={styles.section}>
          <div className={styles.captions}>
            <div>
              <h2 className={styles['captions-title']}>Часть кластера «Остров фортов»</h2>
              <p className={styles['caption__description']}>видео о Кластере</p>
            </div>

            <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
              <div className={styles['caption']}>
                <h2 className={styles['caption__title']}>
                  <span>
                    парк <br />
                    «остров фортов»
                  </span>
                </h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>для активного отдыха и прогулок с детьми</p>
              </div>
              <div className={styles['caption']}>
                <h2 className={styles['caption__title']}>32</h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>
                  комфортных общественных и социальных объекта инфраструктуры
                </p>
              </div>
              <div className={styles['caption']}>
                <h2 className={styles['caption__title']}>3</h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>объекта всемирного культурного наследия ЮНЕСКО</p>
              </div>
            </div>
            <div className={`${styles['caption-items']} ${styles['mobile_captions']}`}>
              <PhoneSlider slides={mobileSlides} />
            </div>
          </div>
        </section>
      }
    </div>
  )
}

const FortovPage = () => {
  return (
    <Suspense>
      <FortovContent />
    </Suspense>
  )
}

export default FortovPage
