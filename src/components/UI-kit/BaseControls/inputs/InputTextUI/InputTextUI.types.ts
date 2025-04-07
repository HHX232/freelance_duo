import {InputHTMLAttributes} from 'react'
type TTheme = 'white' | 'dark'
export interface IField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  error?: string
  extraClass?: string
  type?: string
  extraStyle?: React.CSSProperties
  icon?: React.ReactNode
  labelText?: string
  extraClassClearIcon?: string
  disabled?: boolean
  theme?: TTheme
  customPattern?: RegExp
  textAfterValue?: string
  value?: string
  spacesBetwenNumbers?: boolean
}
