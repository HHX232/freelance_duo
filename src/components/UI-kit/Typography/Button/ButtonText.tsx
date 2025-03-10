import {FC, PropsWithChildren} from 'react'
import cn from 'clsx'
import styles from './ButtonText.module.scss'
import IButtonTextProps from './ButtonText.type'

const ButtonTextUI: FC<PropsWithChildren<IButtonTextProps>> = ({
  children,
  size = 'md',
  weight = 'regular',
  extraClass,
  extraStyle
}) => {
  return (
    <p
      className={cn(styles.button, styles[`button_${size}`], styles[`button_${weight}`], extraClass)}
      style={extraStyle}
    >
      {children}
    </p>
  )
}

export default ButtonTextUI
