type TInputTextType = 'label' | 'content' | 'caption'

interface IInputTextProps {
  children: React.ReactNode
  type: TInputTextType
  extraClass?: string
  extraStyle?: React.CSSProperties
}

export default IInputTextProps
