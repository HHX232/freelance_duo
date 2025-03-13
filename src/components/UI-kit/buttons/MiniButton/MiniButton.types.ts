import {ComponentPropsWithRef} from 'react'

type TMiniButton = 'Link' | 'Button'
type TBorderColor =
  | 'none'
  | 'orange-light'
  | 'orange-dark'
  | 'orange-default'
  | 'blue-light'
  | 'blue-extra-light'
  | 'blue-dark'
  | 'gray-light'
  | 'gray-dark'
  | 'dark'
  | 'bronze'

type TBorderWidth = '1px' | '2px' | '3px'
type TButtonFill =
  | 'none'
  | 'orange-500'
  | 'orange-600'
  | 'orange-700'
  | 'bronze-500'
  | 'bronze-600'
  | 'bronze-700'
  | 'blue'
  | 'blue-middle'
  | 'blue-light'
  | 'gray'
  | 'gray-light'
  | 'white'
type TButtonElementColor = 'white' | 'black' | 'orange' | 'blue'
type TButtonBorderRadius = '0' | '6px' | '12px' | 'circle'
type backgroundOpacity = 'visible' | 'hidden' | 'inherit' | '8' | '16' | '24' | '32' | '40' | '48'
interface IArrowProps {
  arrowExtraClass?: string
  arrowColor?: string | 'white' | 'dark'
  arrowWidth?: string
  arrowHeight?: string
  arrowStrokeWidth?: string
  arrowExtraStyles?: React.CSSProperties
}
export interface IMiniButtonProps extends IArrowProps {
  type?: TMiniButton
  border: boolean
  borderColor?: TBorderColor | string
  borderWidth?: TBorderWidth
  buttonFill?: TButtonFill
  buttonElementColor?: TButtonElementColor
  animationOn?: boolean
  buttonBorderRadius?: TButtonBorderRadius
  onClick?: () => void
  disabled?: boolean
  href?: string
  extraStyle?: React.CSSProperties
  backgroundOpacity?: backgroundOpacity
  extraClass?: string
  activeButton: boolean
  restProps?: ComponentPropsWithRef<'button'>
}
