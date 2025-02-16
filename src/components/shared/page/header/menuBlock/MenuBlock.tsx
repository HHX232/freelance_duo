'use client'
import styles from './MenuBlock.module.scss'
import MenuItem from '../menuItem/MenuItem'
import {useIsMobile} from '@utils/useIsMobile'
import React from 'react'

interface MenuBlockProps {
  title: string
  openable?: boolean
  children?: React.ReactNode
  className?: string
  closeHandler?: () => void
}

const MenuBlock = ({title, children, closeHandler}: MenuBlockProps) => {
  const isMobile = useIsMobile()

  if (children) {
    children = React.Children.map(children, (child) => {
      return React.cloneElement(child as React.ReactElement, {closeHandler: closeHandler})
    })
  }

  return (
    <div className={styles.column}>
      {isMobile ? (
        <MenuItem text={title} className={styles.topMenuItem} openable>
          {children}
        </MenuItem>
      ) : (
        <>
          <p>{title}</p>
          <ul className={styles.list}>{children}</ul>
        </>
      )}
    </div>
  )
}

export default MenuBlock
