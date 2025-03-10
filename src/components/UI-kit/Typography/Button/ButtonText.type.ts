type IButtonTextSize = 'md' | 'sm'
type IButtonTextWeight = 'regular' | 'medium'

interface IButtonTextProps {
  children: React.ReactNode
  size: IButtonTextSize
  weight?: IButtonTextWeight
  extraClass?: string
  extraStyle?: React.CSSProperties
}

export default IButtonTextProps
