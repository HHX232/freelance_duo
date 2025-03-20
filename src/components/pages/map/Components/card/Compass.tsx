'use client'
import styles from './Card.module.scss'
import CompassSVG from '@icons/compass.svg'
import PulseSVG from '@icons/pulse.svg'
import clsx from 'clsx'
import {useEffect, useState} from 'react'
import {CompassProps} from './model'
import dynamic from 'next/dynamic'
import PopupWrapper from '@src/components/UI-kit/Popup/popup'
import {useWindowWidth} from '@shared/page/header/components/HeaderMenu/hooks/useWindowWidth'
import Logo from '@icon/card.svg'
import BorderedButton from '@shared/borderedButton/BorderedButton'
import {useRouter} from 'next/navigation'
import ParagraphUI from '@src/components/UI-kit/Typography/Paragraph/Paragraph'

const CompassCard = dynamic(() => import('./CompassCard'), {ssr: false})

const PADDING = 40
const COMPASS_WIDTH = 84

const CARD_WIDTH = 607
const CARD_HEIGHT = 327

const TIME_TO_SHOW_CARD = 300

const Compass = ({
  name,
  text,
  color,
  coords,
  isMobile = false,
  onClickCompass,
  coords_mob,
  link,
  disablePopup,
  CustomStar,
  className,
  id
}: CompassProps) => {
  const [compassLocation, setCompassLocation] = useState({x: 0, y: 0})
  const [isTimeoutActive, setIsTimeoutActive] = useState<undefined | NodeJS.Timeout>(undefined)
  const [isHovered, setIsHovered] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const isInTheRightSide = coords.x > 50
    const isInTheBottomSide = coords.y > 50

    const shiftX = isInTheRightSide ? -(CARD_WIDTH + PADDING) + 150 : PADDING + COMPASS_WIDTH
    const shiftY = isInTheBottomSide ? -(CARD_HEIGHT + PADDING) : PADDING + COMPASS_WIDTH + 60

    setCompassLocation({x: shiftX, y: shiftY})
  }, [coords.x, coords.y])

  const onEnterCard = () => {
    if (!isTimeoutActive) return
    clearTimeout(isTimeoutActive)
    setIsHovered(true)
  }

  const onLeaveCard = () => {
    setIsHovered(false)
    setIsTimeoutActive(undefined)
  }

  const onEnterInnerCompass = () => setIsHovered(true)
  const onLeaveInnerCompass = () => setIsTimeoutActive(setTimeout(onLeaveCard, TIME_TO_SHOW_CARD))

  const [moblilePopUpIsOpen, setMobilePopUpIsOpen] = useState(false)
  const windowWidth = useWindowWidth()

  const openMobilePopUpAction = () => {
    if (!windowWidth || windowWidth > 1280) return

    setMobilePopUpIsOpen(true)
  }

  return (
    <>
      {!disablePopup && (
        <PopupWrapper isOpen={moblilePopUpIsOpen} setIsOpen={(value) => setMobilePopUpIsOpen(value)}>
          <div className={styles.mobile_modal}>
            <div className={styles.modal_logo_wrapper}>
              <Logo style={{color}} className={styles.popup_logo} />
              <span className={styles.modal_name}>{name}</span>
            </div>
            <div className={styles.mobile_modal_content}>
              <ParagraphUI weight={'regular'} extraClass={styles.modal_text} size='md'>
                {text}
              </ParagraphUI>
              {link && (
                <BorderedButton className={styles.modal_button} onClick={() => router.push(link.href)}>
                  <span style={{color: color}}>{link.title}</span>
                </BorderedButton>
              )}
            </div>
          </div>
        </PopupWrapper>
      )}
      <div
        className={clsx(styles.cardWrapper, className)}
        id={id}
        style={{
          top: `${isMobile ? coords_mob?.y : coords.y}%`,
          left: `${isMobile ? coords_mob?.x : coords.x}%`,
          zIndex: isHovered ? '6' : '2'
        }}
      >
        <div className={styles.compassLink}>
          <button onClick={openMobilePopUpAction} className={clsx(styles.compass_button)}>
            {CustomStar?.(styles.compass) || (
              <CompassSVG
                onMouseEnter={onEnterInnerCompass}
                onMouseLeave={onLeaveInnerCompass}
                onClick={onClickCompass}
                style={{color}}
                className={styles.compass}
              />
            )}
            <PulseSVG className={clsx(styles.pulse1, styles.pulse)} />
            <PulseSVG className={clsx(styles.pulse2, styles.pulse)} />
            <PulseSVG className={clsx(styles.pulse3, styles.pulse)} />
          </button>
        </div>
        {!isMobile && !disablePopup && (
          <CompassCard
            color={color}
            name={name}
            text={text}
            coords={compassLocation}
            isVisible={isHovered}
            onEnterCard={onEnterCard}
            onLeaveCard={onLeaveCard}
            disablePopup={disablePopup}
          />
        )}
      </div>
    </>
  )
}

export default Compass
