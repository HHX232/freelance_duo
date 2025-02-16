'use client'
import styles from './Card.module.scss'
import CompassSVG from '@icons/compass.svg'
import PulseSVG from '@icons/pulse.svg'
import { Coords } from '@src/components/model'
import clsx from 'clsx'
import { CSSProperties, MouseEventHandler, useEffect, useState } from 'react'
import { CompassProps } from './model'
import dynamic from 'next/dynamic'
const CompassCard = dynamic(() => import('./CompassCard'), { ssr: false })

const PADDING = 40
const COMPASS_WIDTH = 84

const CARD_WIDTH = 607
const CARD_HEIGHT = 327

const TIME_TO_SHOW_CARD = 300

export interface CardProps {
  name: string
  text?: string
  color: string
  coords?: Coords
  onEnterCard?: MouseEventHandler<HTMLDivElement> | undefined
  onLeaveCard?: MouseEventHandler<HTMLDivElement> | undefined
  onClickCloseCard?: MouseEventHandler<SVGElement> | undefined
  isVisible: boolean
  style?: CSSProperties
}

const Compass = ({ name, text, color, coords, isMobile = false, onClickCompass }: CompassProps) => {
  const [compassLocation, setCompassLocation] = useState({ x: 0, y: 0 })
  const [isTimeoutActive, setIsTimeoutActive] = useState<undefined | NodeJS.Timeout>(undefined)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const isInTheRightSide = coords.x > 50
    const isInTheBottomSide = coords.y > 50

    const shiftX = isInTheRightSide ? -(CARD_WIDTH + PADDING) : PADDING + COMPASS_WIDTH
    const shiftY = isInTheBottomSide ? -(CARD_HEIGHT + PADDING) : PADDING + COMPASS_WIDTH

    setCompassLocation({ x: shiftX, y: shiftY })
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

  return (
    <div
      className={styles.cardWrapper}
      style={{
        top: `${coords.y}%`,
        left: `${coords.x}%`,
        zIndex: isHovered ? '3' : '2'
      }}
    >
      <div className={styles.compassLink}>
        <CompassSVG
          onMouseEnter={onEnterInnerCompass}
          onMouseLeave={onLeaveInnerCompass}
          onClick={onClickCompass}
          className={styles.compass}
          style={{ color }}
        />
        <PulseSVG className={clsx(styles.pulse1, styles.pulse)} />
        <PulseSVG className={clsx(styles.pulse2, styles.pulse)} />
        <PulseSVG className={clsx(styles.pulse3, styles.pulse)} />
      </div>
      {!isMobile && (
        <CompassCard
          color={color}
          name={name}
          text={text}
          coords={compassLocation}
          isVisible={isHovered}
          onEnterCard={onEnterCard}
          onLeaveCard={onLeaveCard}
        />
      )}
    </div>
  )
}

export default Compass
