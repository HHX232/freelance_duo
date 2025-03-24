import {EmblaCarouselType, EmblaEventType, EmblaOptionsType} from 'embla-carousel'
import {EmblaViewportRefType} from 'embla-carousel-react'
import emblaStyle from './embla.module.scss'
import {FC, useCallback, useEffect, useRef} from 'react'
import Image from 'next/image'

interface PropType {
  slides: number[]
  options?: EmblaOptionsType
  emblaRef: EmblaViewportRefType
  emblaApi: EmblaCarouselType | undefined
}

const EmblaCarousel: FC<PropType> = (props) => {
  const {slides, emblaRef, emblaApi} = props
  const imgArr = [
    '/content/storerooms/carousel/st_1.webp',
    '/content/storerooms/carousel/st_2.webp',
    '/content/storerooms/carousel/st_3.webp',
    '/content/storerooms/carousel/st_4.webp'
  ]

  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])
  const TWEEN_FACTOR_BASE = 0.12

  const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(`.slide_item`) as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]
      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const scale = numberWithinRange(tweenValue, 0, 1).toString()
        const tweenNode = tweenNodes.current[slideIndex]
        tweenNode.style.transform = `scale(${scale})`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
  }, [emblaApi, tweenScale])

  return (
    <div className={emblaStyle['embla']}>
      <div className={emblaStyle['embla__viewport']} ref={emblaRef}>
        <div className={emblaStyle['embla__container']}>
          {slides?.map((index) => (
            <div className={`${emblaStyle['embla__slide']}`} key={index}>
              <Image
                className={`${emblaStyle['embla__slide__img']} slide_item`}
                src={imgArr[index]}
                width={4096}
                height={2734}
                alt='Your alt text'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
