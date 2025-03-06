'use client'
import clsx from 'clsx'
import styles from './MenuItem.module.scss'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import TabArrowSVG from '@icons/tab-arrow.svg'
import React from 'react'
import {usePathname} from 'next/navigation'

export interface MenuItemProps {
  text: string
  openable?: boolean
  children?: React.ReactNode
  className?: string
  href?: string
  closeHandler?: () => void
}

const MenuItem = ({openable = false, children, text, className, href, closeHandler}: MenuItemProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isStartAnimation, setisStartAnimation] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpened(false)
    setisStartAnimation(false)
  }, [pathname])

  const onClickItem = () => {
    if (isOpened) {
      setisStartAnimation((op) => !op)
      setTimeout(() => setIsOpened((op) => !op), 300)
    } else {
      setIsOpened((op) => !op)
      setTimeout(() => setisStartAnimation((op) => !op))
    }
  }

  const handleLinkClick = () => {
    if (closeHandler) {
      closeHandler()
    }
  }

  if (children) {
    children = React.Children.map(children, (child) => {
      return React.cloneElement(child as React.ReactElement, {closeHandler: closeHandler})
    })
  }

  return (
    <div className={styles.itemContainer}>
      <li className={clsx(className, styles.item)} onClick={onClickItem}>
        {openable ? (
          <div className={styles.openable}>
            <span>{text}</span>
            <TabArrowSVG className={isStartAnimation ? '' : styles.opened} />
          </div>
        ) : (
          <Link href={href || ''} onClick={handleLinkClick}>
            {text}
          </Link>
        )}
      </li>
      {openable && isOpened && (
        <ul className={clsx(styles.openedUl, isStartAnimation ? styles.opened : styles.closed)}>{children}</ul>
      )}
    </div>
  )
}

export default MenuItem
