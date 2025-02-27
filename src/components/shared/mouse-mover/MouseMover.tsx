'use client'

import clsx from 'clsx'
import styles from './MouseMover.module.scss'
import { MouseMoverProps } from './model'
import { Coords } from '@src/components/model'
import { MouseEvent, useLayoutEffect, useState } from 'react'
const COMPONENT_WIDTH = 1920
const COMPONENT_HEIGHT = 1080
const COEFF = COMPONENT_WIDTH / COMPONENT_HEIGHT

const getNeededSize = () => {
  const w = Math.max(COEFF * window.innerHeight, window.innerWidth)
  const h = Math.max(window.innerHeight, (1 / COEFF) * window.innerWidth)

  return { w, h }
}

const MouseMover = ({
  children,
  className,
  innerClassName,
  isMobile = false,
  isMobileCardVisible = false,
  disableMove = false
}: MouseMoverProps & { disableMove?: boolean }) => {
  const [shift, setShift] = useState<Coords>({ x: 0, y: 0 })
  const [size, setSize] = useState({ w: 0, h: 0 })

  // useEffect(() => {
  //   if (isMobile) {
  //     document.getElementById('page')?.scrollTo({ left: size.w / 2 - window.innerWidth / 2 + 130 })
  //   }
  // }, [size, isMobile])

  useLayoutEffect(() => {
    const updateSize = () => {
      const newSize = getNeededSize()
      setSize(newSize)

      if (!isMobile) {
        setShift({
          x: 0,
          y: (newSize.h - window.innerHeight) / 2
        })
      }
    }

    updateSize()

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [isMobile])

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (disableMove) return

    const { w: neededWidth, h: neededHeight } = getNeededSize()

    const diffX = Math.abs(neededWidth - window.innerWidth)
    const diffY = Math.abs(neededHeight - window.innerHeight)

    setShift({
      x: -diffX * (event.clientX / window.innerWidth - 0.5),
      y: -diffY * (event.clientY / window.innerHeight - 0.5)
    })
  }

  return (
    <section
      style={{
        transition: 'filter 0.5s',
        // ...(isMobile
        //   ? {
        //     width: `${size.w}px`,
        //     height: `${size.h}px`
        //   }
        //   : {}),
        ...((isMobile && isMobileCardVisible) ? {
          filter: 'brightness(0.5)'
        } : {})
      }}
      className={clsx(styles.wrapper, className)}
      onMouseMove={onMove}
    >
      <div
        className={clsx(styles.inner, innerClassName)}
        style={{
          transform: isMobile ? '' : `translate(${shift.x}px, ${shift.y}px)`,
          width: `${size.w}px`,
          height: `${size.h}px`
        }}
      >
        {typeof children === 'function' ? children(size) : children}
      </div>
    </section>
  )
}

export default MouseMover
