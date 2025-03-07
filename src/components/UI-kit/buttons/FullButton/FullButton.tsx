import {FC} from 'react'
import {IFullButtonProps} from './FullButton.types'
import Link from 'next/link'
import cn from 'clsx'
import styles from './FullButton.module.scss'
import {ArrowIcon} from './ButtonIcons/ArrowIcon'

//!падинги и подобное просто задайте в extraClass
export const FullButton: FC<IFullButtonProps> = ({
  type = 'Button', // Элемент button или Link
  border = false,
  borderColor = 'none',
  borderWidth = '2px',
  buttonFill = 'none',
  buttonElementColor = 'black',
  animationOn = false,
  buttonBorderRadius = '0',
  disabled = false,
  href = '/',
  onClick,
  buttonText = 'Подобрать квартиру',
  extraClass,
  arrowExtraClass,
  arrowColor = '#000000',
  arrowWidth = '24',
  arrowHeight = '24',
  children,
  arrowStrokeWidth = '1.5',
  arrowExtraStyles,
  containArrow = false
}) => {
  return type === 'Button' ? (
    <button
      className={cn(
        styles.button,
        {
          [styles.disabled]: disabled,
          [styles[`border-color-${borderColor}`]]: borderColor,
          [styles.border]: border === true,
          [styles.none_border]: border === false,
          [styles[`border-width-${borderWidth}`]]: borderWidth,
          [styles[`button-fill-${buttonFill}`]]: buttonFill,
          [styles[`button-element-color-${buttonElementColor}`]]: buttonElementColor,
          [styles.animationOn]: animationOn,
          [styles[`butron-border-radius-${buttonBorderRadius}`]]: buttonBorderRadius
        },
        extraClass
      )}
      onClick={onClick}
    >
      {containArrow && (
        <ArrowIcon
          extraStyle={arrowExtraStyles}
          extraClass={cn(styles.arrow, arrowExtraClass)}
          color={arrowColor}
          width={arrowWidth}
          height={arrowHeight}
          strokeWidth={arrowStrokeWidth}
        />
      )}
      {buttonText}
      {children}
      {containArrow && (
        <ArrowIcon
          extraStyle={arrowExtraStyles}
          extraClass={cn(styles.arrow, arrowExtraClass)}
          color={arrowColor}
          width={arrowWidth}
          height={arrowHeight}
          strokeWidth={arrowStrokeWidth}
        />
      )}
    </button>
  ) : (
    <Link
      href={href}
      className={cn(
        styles.button,
        {
          [styles.disabled]: disabled,
          [styles[`border-color-${borderColor}`]]: borderColor,
          [styles.border]: border === true,
          [styles.none_border]: border === false,
          [styles[`border-width-${borderWidth}`]]: borderWidth,
          [styles[`button-fill-${buttonFill}`]]: buttonFill,
          [styles[`button-element-color-${buttonElementColor}`]]: buttonElementColor,
          [styles.animationOn]: animationOn,
          [styles[`butron-border-radius-${buttonBorderRadius}`]]: buttonBorderRadius
        },
        extraClass
      )}
      onClick={onClick}
    >
      {containArrow && (
        <ArrowIcon
          extraStyle={arrowExtraStyles}
          extraClass={cn(styles.arrow, arrowExtraClass)}
          color={arrowColor}
          width={arrowWidth}
          height={arrowHeight}
          strokeWidth={arrowStrokeWidth}
        />
      )}
      {buttonText}
      {children}
      {containArrow && (
        <ArrowIcon
          extraStyle={arrowExtraStyles}
          extraClass={cn(styles.arrow, arrowExtraClass)}
          color={arrowColor}
          width={arrowWidth}
          height={arrowHeight}
          strokeWidth={arrowStrokeWidth}
        />
      )}
    </Link>
  )
}
