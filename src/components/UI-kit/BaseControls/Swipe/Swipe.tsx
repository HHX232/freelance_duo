import {FC, ReactElement} from 'react'
import s from './swipe.module.scss'
import SwipeIcon from '@icons/swipe.svg'
import clsx from 'clsx'
import {useWindowWidth} from '@shared/page/header/components/HeaderMenu/hooks/useWindowWidth'

interface ISwipeProps {
  className?: string
  customIcon?: ReactElement
  maxVisibleWidth?: number // px
}

const Swipe: FC<ISwipeProps> = (props) => {
  const {className, customIcon, maxVisibleWidth} = props
  const width = useWindowWidth()

  if (width && maxVisibleWidth && width > maxVisibleWidth) return null

  return (
    <div className={clsx(s.wrapper, className)}>
      {(
        <>
          <SwipeIcon />
        </>
      ) || <>{customIcon}</>}
    </div>
  )
}

export default Swipe
