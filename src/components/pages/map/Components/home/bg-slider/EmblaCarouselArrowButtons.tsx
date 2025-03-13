import {ComponentPropsWithRef, useCallback, useEffect, useState} from 'react'
import {EmblaCarouselType} from 'embla-carousel'
import {MiniButton} from '@src/components/UI-kit/buttons/MiniButton/MiniButton'

interface UsePrevNextButtonsType {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const {...restProps} = props

  return (
    <MiniButton
      extraStyle={{
        width: '48px',
        height: '48px'
      }}
      buttonFill={'white'}
      arrowColor={'#555'}
      arrowExtraStyles={{
        transform: 'rotateZ(-135deg)'
      }}
      activeButton={true}
      border={false}
      restProps={restProps}
    />
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const {...restProps} = props

  return (
    <MiniButton
      extraStyle={{
        width: '48px',
        height: '48px'
      }}
      buttonFill={'white'}
      arrowColor={'#555'}
      arrowExtraStyles={{
        transform: 'rotateZ(45deg)'
      }}
      activeButton={true}
      border={false}
      restProps={restProps}
    />
  )
}
