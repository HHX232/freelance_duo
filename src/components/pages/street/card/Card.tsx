'use client'
import styles from './Card.module.scss'
import {CardProps} from './model'
import CompassIcon from '@icons/compass.svg'
import SailIcon from '@icons/sail.svg'
import WaveIcon from '@icons/wave.svg'
import {PointIcon} from '../model'
import {ComponentType, useEffect, useRef, useState} from 'react'
import Image from '@src/components/UI-kit/image/Image'
import {calcLocation} from './calc-location'

const ICONS: Record<PointIcon, ComponentType<React.SVGProps<SVGSVGElement>>> = {
  compass: CompassIcon,
  sail: SailIcon,
  wave: WaveIcon
}

const Card = ({title, type, coords, size}: CardProps) => {
  const Icon = ICONS[type]

  const contentRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  const [elementsLocation, setElementsLocation] = useState({
    text: {x: 0, y: 0},
    content: {x: 0, y: 0},
    line: {x: 0, y: 0, rotate: 0, width: 0}
  })

  useEffect(() => {
    if (!contentRef.current || !textRef.current) return

    const calcRes = calcLocation(coords, contentRef.current, textRef.current, size, type === 'sail')

    setElementsLocation(calcRes)
  }, [coords, type, size])

  return (
    <div className={styles.wrapper}>
      <Icon className={styles.icon} style={{top: `${coords.y}%`, left: `${coords.x}%`}} />
      <div ref={textRef} className={styles.text} style={{top: elementsLocation.text.y, left: elementsLocation.text.x}}>
        <p>ЗОНА ИНТЕРЕСА #1</p>
      </div>
      <div
        className={styles.line}
        style={{
          top: elementsLocation.line.y,
          left: elementsLocation.line.x,
          maxWidth: elementsLocation.line.width,
          rotate: `${elementsLocation.line.rotate}deg`
        }}
      />
      <div
        ref={contentRef}
        className={styles.content}
        style={{top: elementsLocation.content.y, left: elementsLocation.content.x}}
      >
        <Image className={styles.image} src={'/street/point-1.png'} alt='point image' />
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  )
}

export default Card
