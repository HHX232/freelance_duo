import {ComponentPropsWithRef} from 'react'

export type SwitchUIType = 'checkbox' | 'radio'

export type SwitchUISize = 'lg' | 'md' | 'sm'

export interface ISwitchUIProps extends ComponentPropsWithRef<'input'> {
  type?: SwitchUIType
  uiSize?: SwitchUISize
  error?: string
  children?: React.ReactNode
  extraClass?: string
  extraStyles?: React.CSSProperties
}
