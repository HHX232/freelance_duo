import {ComponentPropsWithRef} from 'react'

export type RadioUISize = 'lg' | 'md' | 'sm'

export interface IRadioUIProps extends ComponentPropsWithRef<'input'> {
  children?: React.ReactNode
  error?: string
  uiSize?: RadioUISize
  extraClass?: string
  extraStyles?: React.CSSProperties
}
