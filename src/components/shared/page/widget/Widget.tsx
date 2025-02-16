'use client'
import styles from './Widget.module.scss'
import WidgetSVG from '@icons/widget.svg'
import clsx from 'clsx'
import Link from 'next/link'
import {CSSProperties} from 'react'
import {useRouter} from 'next/navigation'

export interface WidgetProps {
  color: 'accent' | 'korichneviy'
  classNameWrapper?: string
  classNameLink?: string
  classNameSVG?: string

  style?: CSSProperties
}

const Widget = ({color = 'accent', classNameWrapper, classNameLink, classNameSVG, style}: WidgetProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.replace('/planirovki-i-ceny')
  }

  return (
    <div style={style} className={clsx(styles.wrapper, classNameWrapper)} onClick={handleClick}>
      <Link className={classNameLink} href='/planirovki-i-ceny'>
        <WidgetSVG className={clsx(styles[`${color}Color`], classNameSVG)} />
      </Link>
    </div>
  )
}

export default Widget
