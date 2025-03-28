import {HTMLAttributes} from 'react'

type IButtonTextSize = 'md' | 'sm'
type IButtonTextWeight = 'regular' | 'medium'

interface IButtonTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  size: IButtonTextSize
  weight?: IButtonTextWeight
  extraClass?: string
  extraStyle?: React.CSSProperties
}

export default IButtonTextProps
