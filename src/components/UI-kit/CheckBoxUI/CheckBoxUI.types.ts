import React from 'react'
type TCheckBoxUIProps = 'dash' | 'check'
type TCheckSize = 'large' | 'medium' | 'small'
export interface CheckBoxUIProps {
  label: React.ReactNode
  name: string
  value: string
  onChange?: (checked: boolean) => void
  defaultChecked?: boolean
  disabled?: boolean
  error?: string
  [key: string]: any
  extraClass?: string
  extraStyle?: React.CSSProperties
  typeMark?: TCheckBoxUIProps
  size?: TCheckSize
  labelExtraClass?: string
  errorExtraClass?: string
}
