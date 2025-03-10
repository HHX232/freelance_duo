import {FC, PropsWithChildren} from 'react'
import cn from 'clsx'
import styles from './Paragrapg.module.scss'
import IParagraphProps from './Paragraph.type'

const ParagraphUI: FC<PropsWithChildren<IParagraphProps>> = ({
  children,
  size = 'lg',
  weight = 'medium',
  extraClass,
  extraStyle
}) => {
  return (
    <p
      className={cn(styles.paragraph, styles[`paragraph_${size}`], styles[`paragraph_${weight}`], extraClass)}
      style={extraStyle}
    >
      {children}
    </p>
  )
}

export default ParagraphUI
