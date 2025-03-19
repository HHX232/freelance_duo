type IParagraphSize = 'lg' | 'md' | 'sm' | 'xs'
type IParagrapgWeight = 'light' | 'regular' | 'medium' | 'bold'

interface IParagraphProps {
  children: React.ReactNode
  size: IParagraphSize
  weight?: IParagrapgWeight
  extraClass?: string
  extraStyle?: React.CSSProperties
}

export default IParagraphProps
