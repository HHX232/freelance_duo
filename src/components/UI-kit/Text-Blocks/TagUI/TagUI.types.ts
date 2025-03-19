type TTagUIColors = 'gray' | 'white' | 'dark'
type TTagUISize = 'small' | 'medium' | 'large'

export interface ITagUIProps {
  color?: TTagUIColors
  text: React.ReactNode
  extraClass?: string
  extraStyle?: React.CSSProperties
  circleContain?: boolean
  size?: TTagUISize
}
