type IParagraphSize = 'lg' | 'md' | 'sm' | 'xs'
type IParagraphWeight = 'light' | 'regular' | 'medium' | 'bold'

interface IParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  size?: IParagraphSize
  weight?: IParagraphWeight
  extraClass?: string
  extraStyle?: React.CSSProperties
}

export default IParagraphProps
