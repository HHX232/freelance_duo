import styles from './Home.module.scss'
import sliderStyle from './bg-slider/slider.module.scss'
import MenuPoint from '@icons/Menu point.svg'
import useRouterNext from '@src/lib/hooks/useRouter'
import {EmblaOptionsType} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import Gallery from './bg-slider/Gallery'
import {DotButton, useDotButton} from './bg-slider/EmblaCarouselDotButton'
import {NextButton, PrevButton, usePrevNextButtons} from './bg-slider/EmblaCarouselArrowButtons'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import ButtonTextUI from '@src/components/UI-kit/Text-Elements/Typography/Button/ButtonText'
import H1Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H1Title'

const slidesSubTitles = [
  'Море меняет все, Море здесь – главная доминанта, наполняющая энергией все пространство вокруг.',
  'Органично встроенный в общий облик города квартал с многофункциональной инфраструктурой, отвечающей высоким стандартам жилой среды.'
]

const HomePage = () => {
  const {replace} = useRouterNext()
  const OPTIONS: EmblaOptionsType = {loop: true}
  const SLIDE_COUNT = 2
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [ClassNames()])
  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi)
  const {prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick} = usePrevNextButtons(emblaApi)

  return (
    <div>
      <section className={styles['home-wrapper']}>
        <div className={styles['text_wrapper']}>
          <H1Title extraClass={styles.extra_title}>Кронфорт</H1Title>
          {slidesSubTitles.map((_, index) => {
            if (index !== selectedIndex) return null

            return (
              <p key={index} className={`${styles.description}`}>
                {slidesSubTitles[selectedIndex]}
              </p>
            )
          })}
        </div>
        <div className={styles['button_wrapper']}>
          {/* <FilledButton>
            <MenuPoint className={styles['icon']} />
            <span>Подобрать квартиру</span>
          </FilledButton> */}
          <FullButton
            type={'Button'}
            onClick={() => {
              replace({
                pathname: '/planirovki-i-ceny',
                query: {}
              })
            }}
            buttonBorderRadius={'6px'}
            activeButton={true}
            border={false}
            borderColor={''}
            buttonFill={'bronze-500'}
            buttonElementColor={'white'}
            buttonText={''}
          >
            <ButtonTextUI size={'md'} extraClass={styles.findApartmentButtonInner}>
              <MenuPoint className={styles['icon']} />
              Подобрать квартиру
            </ButtonTextUI>
          </FullButton>
        </div>
        <div className={styles['slider_outer_wrapper']}>
          <Gallery slides={SLIDES} options={OPTIONS} emblaRef={emblaRef} />
        </div>
        <div className={styles['slider_controls']}>
          <div className={styles['dots_wrapper']}>
            <div className={sliderStyle['embla__dots']}>
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`${sliderStyle['embla__dot']} ${index === selectedIndex && sliderStyle['embla__dot--selected']}`}
                />
              ))}
            </div>
          </div>
          <div className={styles['embla__buttons']}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
