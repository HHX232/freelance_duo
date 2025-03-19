import React, {ComponentPropsWithRef} from 'react'
type TCheckBoxUIProps = 'dash' | 'check'
type TCheckSize = 'lg' | 'md' | 'sm'
export interface CheckBoxUIProps extends ComponentPropsWithRef<'input'> {
  children?: React.ReactNode
  error?: string
  extraClass?: string
  extraStyle?: React.CSSProperties
  typeMark?: TCheckBoxUIProps
  uiSize?: TCheckSize
  labelExtraClass?: string
  errorExtraClass?: string
}
