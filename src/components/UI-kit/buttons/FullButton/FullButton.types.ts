type TFullButton = 'Link' | 'Button'
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
  | 'gray'
  | 'gray-light'
  | 'white'

type TButtonElementColor = 'white' | 'black' | 'orange' | 'blue'
type TButtonBorderRadius = '0' | '6px' | '12px' | 'circle'

interface IArrowProps {
  arrowExtraClass?: string
  arrowColor?: string
  arrowWidth?: string
  arrowHeight?: string
  arrowStrokeWidth?: string
  arrowExtraStyles?: React.CSSProperties
}
export interface IFullButtonProps extends IArrowProps {
  type?: TFullButton
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
  buttonText: string | React.ReactNode
  extraClass?: string
  containArrow?: boolean
  children?: React.ReactNode
}
