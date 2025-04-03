'use client'
import {Suspense, useEffect, useRef, useState} from 'react'
import styles from './Fortov.module.scss'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
import TextAccentBlockUI from '@src/components/UI-kit/Text-Blocks/TextAccentBlockUI/TextAccentBlockUI'
import H3Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H3Title'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'

const FortovContent = () => {
  const mobileSlides: React.ReactNode[] = [
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']} ${styles.mobile_slide}`} key={22213}>
      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>
          <span>
            парк <br />
            «остров фортов»
          </span>
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={`${styles['caption__description']} `}>для активного отдыха и прогулок с детьми</p>
      </div>
    </div>,

    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']} ${styles.mobile_slide}`} key={341411414}>
      <div className={styles['caption']}>
        <h2 className={`${styles['caption__title']} ${styles.number_title}`}>32</h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>комфортных общественных и социальных объекта инфраструктуры</p>
      </div>
    </div>,

    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']} ${styles.mobile_slide}`} key={3131}>
      <div className={styles['caption']}>
        <h2 className={`${styles['caption__title']} ${styles.number_title}`}>3</h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>объекта всемирного культурного наследия ЮНЕСКО</p>
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
      { threshold: 0.4 }
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
          <div className={`${styles.captions} ${isVisible ? styles.visible : ''}`}>
            <div>
              <H3Title className={styles.title_color}>Часть кластера «Остров фортов»</H3Title>
              {/* <h2 className={styles['captions-title']}></h2> */}
              <ParagraphUI extraClass={styles.subtitle_color} size='lg' weight='light'>
                видео о Кластере
              </ParagraphUI>
              {/* <p className={`  ${styles.caption_sub_title}`}></p> */}
            </div>

            <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
              {/* <div className={styles['caption']}>
                <h2 className={styles['caption__title']}>
                  <span>
                    парк <br />
                    «остров фортов»
                  </span>
                </h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>для активного отдыха и прогулок с детьми</p>
              </div> */}
              <TextAccentBlockUI
                textTitle=''
                hideTitle
                extraContainerClass={styles.max_width}
                hideDecorElement
                textMainContent={
                  <span>
                    {' '}
                    для активного отдыха и прогулок <br /> с детьми{' '}
                  </span>
                }
                textSubTitle={
                  <span>
                    парк <br /> «остров фортов»
                  </span>
                }
              />
              {/* <div className={styles['caption']}>
                <h2 className={`${styles['caption__title']} ${styles.number_title}`}>32</h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>
                  комфортных общественных и социальных объекта инфраструктуры
                </p>
              </div> */}
              <TextAccentBlockUI
                textTitle='32'
                extraContainerClass={styles.max_width}
                hideDecorElement
                textMainContent={
                  <span>
                    {' '}
                    комфортных общественных и социальных <br /> объекта инфраструктуры
                  </span>
                }
                textSubTitle=''
                hideSubTitle
              />
              {/* <div className={styles['caption']}>
                <h2 className={`${styles['caption__title']} ${styles.number_title}`}>3</h2>
                <hr className={styles['caption__divider']} />
                <p className={styles['caption__description']}>объекта всемирного культурного наследия ЮНЕСКО</p>
              </div> */}
              <TextAccentBlockUI
                textTitle='3'
                extraContainerClass={styles.max_width}
                hideDecorElement
                textMainContent={
                  <span>
                    {' '}
                    объекта всемирного культурного <br /> наследия ЮНЕСКО
                  </span>
                }
                textSubTitle=''
                hideSubTitle
              />
            </div>
            <div className={`${styles['caption-items']} ${styles['mobile_captions']}`}>
              <PhoneSlider
                embalaContainerClassName={styles.phone_slider_container}
                sliderWrapperClassName={styles.phone_slider_wrapper}
                options={{align: 'start'}}
                slideGap={60}
                viewportIsShow
                slides={mobileSlides}
              />
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
