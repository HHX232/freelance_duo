import styles from './InputText.module.scss'
import cn from 'clsx'
import {FC, PropsWithChildren} from 'react'
import IInputTextProps from './InputText.type'

const InputText: FC<PropsWithChildren<IInputTextProps>> = ({children, type, extraClass, extraStyle}) => {
  return (
    <span className={cn(styles.inputText, styles[`inputText_${type}`], extraClass)} style={extraStyle}>
      {children}
    </span>
  )
}

export default InputText
