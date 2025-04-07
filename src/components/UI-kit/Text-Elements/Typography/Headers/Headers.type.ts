import {HTMLAttributes} from 'react'

export interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  className?: string
  extraStyle?: React.CSSProperties
  extraClass?: string
}
