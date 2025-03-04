'use client'

import clsx from 'clsx'
import styles from './MouseMover.module.scss'
import {MouseMoverProps} from './model'
import {useLayoutEffect, useState} from 'react'

const COMPONENT_WIDTH = 1920
const COMPONENT_HEIGHT = 1080
const COEFF = COMPONENT_WIDTH / COMPONENT_HEIGHT

const getNeededSize = () => {
  const isMobile = window.innerWidth < 768 // Проверка на мобильное устройство
  const baseHeight = document.documentElement.clientHeight
  const baseWidth = window.outerWidth

  const h = isMobile ? baseHeight : Math.max(baseHeight, (1 / COEFF) * baseWidth)

  const w = Math.max(COEFF * baseHeight, baseWidth)

  return {w, h}
}

const MouseMover = ({
  children,
  className,
  innerClassName,
  isMobile = false,
  isMobileCardVisible = false
}: MouseMoverProps & {disableMove?: boolean}) => {
  const [size, setSize] = useState({w: 0, h: 0})

  useLayoutEffect(() => {
    const updateSize = () => {
      const newSize = getNeededSize()
      setSize(newSize)
    }

    updateSize()

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [isMobile])

  return (
    <section
      style={{
        width: isMobile ? '100%' : 'auto',
        ...(isMobile && isMobileCardVisible
          ? {
              filter: 'brightness(0.5)'
            }
          : {})
      }}
      className={clsx(styles.wrapper, className)}
    >
      <div
        className={clsx(styles.inner, innerClassName)}
        style={{
          width: `${size.w}px`,
          height: `${size.h}px`,
          transform: isMobile ? 'none' : undefined
        }}
      >
        {typeof children === 'function' ? children(size) : children}
      </div>
    </section>
  )
}

export default MouseMover
