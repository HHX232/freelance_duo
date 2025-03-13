import {ComponentPropsWithRef} from 'react'
import {TLinkSize} from '../Typography/Link/LinkUI.types'

export interface RadioUIProps extends ComponentPropsWithRef<'input'> {
  children?: React.ReactNode
  error?: string
  uiSize?: TLinkSize
  extraClass?: string
  extraStyles?: React.CSSProperties
}
