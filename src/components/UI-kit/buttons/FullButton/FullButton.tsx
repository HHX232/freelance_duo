import {FC} from 'react'
import {IFullButtonProps} from './FullButton.types'
import Link from 'next/link'
import cn from 'clsx'
import styles from './FullButton.module.scss'
import {ArrowIcon} from '../ButtonIcons/ArrowIcon'

// ! ЕСЛИ РАМКА НЕ ОТОБРАЖАЕТСЯ, ТО ОБЕРНИТЕ В СПАН С Z-INDEX++

// ! Standart фон и рамки задают активные состояния кнопок при включенном activeButton = {true}

/* <FullButton
buttonBorderRadius='6px'
activeButton={true}
buttonText='Hello'
buttonFill='gray-light'
borderColor='none'
containArrow={true}
arrowColor='white'
type='Button'
border={false}
borderWidth='1px'
disabled={true}
/> */
/* <FullButton
containArrow={true}
buttonElementColor='black'
arrowColor='black'
buttonBorderRadius='6px'
activeButton={true}
buttonText='Hello'
buttonFill='white'
type='Button'
border={true}
borderWidth='1px'
/> */
//!падинги и подобное просто задайте в extraClass
export const FullButton: FC<IFullButtonProps> = ({
  type = 'Button', // Элемент button или Link
  activeButton = true,
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
          // !Ниже идет серая полупрозрачная
          [styles.active_button_gray_transparent]: activeButton && !border && buttonFill === 'gray-light',
          // !Ниже идут с рамками
          [styles.active_button_transparent_with_orange_border]:
            activeButton && buttonFill === 'none' && borderColor === 'orange-default',
          [styles.active_button_transparent_with_gray_border]:
            activeButton && buttonFill === 'none' && borderColor === 'gray',
          // ! Стили для дизейбл версий
          [styles.disabled]: disabled,
          [styles.disabled_active_button_bronze]: disabled && activeButton && buttonFill === 'bronze-500',
          [styles.disabled_active_button_orange]: disabled && activeButton && buttonFill === 'orange-500',
          [styles.disabled_active_button_white]: disabled && activeButton && buttonFill === 'white',
          [styles.disabled_active_button_transparent_with_orange_border]:
            disabled && activeButton && buttonFill === 'none' && borderColor === 'orange-default',
          [styles.disabled_active_button_transparent_with_gray_border]:
            disabled && activeButton && buttonFill === 'none' && borderColor === 'gray',
          [styles.disabled_active_button_gray_transparent]:
            disabled && activeButton && !border && buttonFill === 'gray-light',
          // ! Ниже идет кастомные отдельные части кнопок
          [styles[`border-color-${borderColor}`]]: borderColor,
          [styles.border]: border === true,
          [styles.none_border]: border === false,
          [styles[`border-width-${borderWidth}`]]: borderWidth,
          [styles[`button-fill-${buttonFill}`]]: buttonFill,
          [styles[`button-element-color-${buttonElementColor}`]]: buttonElementColor,
          [styles.animationOn]: animationOn,
          [styles[`butron-border-radius-${buttonBorderRadius}`]]: buttonBorderRadius,
          //! Ниже идут с заливкой
          [styles.active_button_bronze]: activeButton && buttonFill === 'bronze-500',
          [styles.active_button_orange]: activeButton && buttonFill === 'orange-500',
          [styles.active_button_white]: activeButton && buttonFill === 'white'
        },
        extraClass
      )}
      onClick={onClick}
    >
      {containArrow && (
        <ArrowIcon
          extraStyle={arrowExtraStyles}
          extraClass={cn(styles.arrow, styles.arrow_active, arrowExtraClass)}
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
          extraClass={cn(styles.arrow, styles.arrow_active, arrowExtraClass)}
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
          // !Ниже идет серая полупрозрачная
          [styles.active_button_gray_transparent]: activeButton && !border && buttonFill === 'gray-light',
          // !Ниже идут с рамками
          [styles.active_button_transparent_with_orange_border]:
            activeButton && buttonFill === 'none' && borderColor === 'orange-default',
          [styles.active_button_transparent_with_gray_border]:
            activeButton && buttonFill === 'none' && borderColor === 'gray',
          // ! Стили для дизейбл версий
          [styles.disabled]: disabled,
          [styles.disabled_active_button_bronze]: disabled && activeButton && buttonFill === 'bronze-500',
          [styles.disabled_active_button_orange]: disabled && activeButton && buttonFill === 'orange-500',
          [styles.disabled_active_button_white]: disabled && activeButton && buttonFill === 'white',
          [styles.disabled_active_button_transparent_with_orange_border]:
            disabled && activeButton && buttonFill === 'none' && borderColor === 'orange-default',
          [styles.disabled_active_button_transparent_with_gray_border]:
            disabled && activeButton && buttonFill === 'none' && borderColor === 'gray',
          [styles.disabled_active_button_gray_transparent]:
            disabled && activeButton && !border && buttonFill === 'gray-light',
          // ! Ниже идет кастомные отдельные части кнопок
          [styles[`border-color-${borderColor}`]]: borderColor,
          [styles.border]: border === true,
          [styles.none_border]: border === false,
          [styles[`border-width-${borderWidth}`]]: borderWidth,
          [styles[`button-fill-${buttonFill}`]]: buttonFill,
          [styles[`button-element-color-${buttonElementColor}`]]: buttonElementColor,
          [styles.animationOn]: animationOn,
          [styles[`butron-border-radius-${buttonBorderRadius}`]]: buttonBorderRadius,
          //! Ниже идут с заливкой
          [styles.active_button_bronze]: activeButton && buttonFill === 'bronze-500',
          [styles.active_button_orange]: activeButton && buttonFill === 'orange-500',
          [styles.active_button_white]: activeButton && buttonFill === 'white'
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
