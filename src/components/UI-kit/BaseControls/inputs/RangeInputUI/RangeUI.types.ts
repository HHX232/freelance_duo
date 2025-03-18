import {InputHTMLAttributes} from 'react'
type TTheme = 'white' | 'dark'

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  labelText?: string
  error?: string
  extraClass?: string
  extraStyle?: React.CSSProperties
  icon?: React.ReactNode
  extraClassClearIcon?: string
  disabled?: boolean
  theme?: TTheme
  minValue?: number
  maxValue?: number
  isNeedToClear?: boolean
  textAfterValue?: string
  isNeedToClear?: boolean
}
