import {FC} from 'react'
import {IMiniButtonProps} from './MiniButton.types'
import Link from 'next/link'
import cn from 'clsx'
import styles from './MiniButton.module.scss'
import {ArrowIcon} from '../ButtonIcons/ArrowIcon'

// ! ЕСЛИ РАМКА НЕ ОТОБРАЖАЕТСЯ, ТО ОБЕРНИТЕ В СПАН С Z-INDEX++
// ? Стили под красными комментариями идут для кнопок с активным состоянием cn(activeButton === true)
// ? -----------------------------------------------------------------------------------------------

const hexToRgba = (hex: string, opacity: number): string => {
  const hexColor = hex.replace('#', '')

  const r = parseInt(hexColor.slice(0, 2), 16)
  const g = parseInt(hexColor.slice(2, 4), 16)
  const b = parseInt(hexColor.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

//!падинги и подобное просто задайте в extraClass
export const MiniButton: FC<IMiniButtonProps> = ({
  type = 'Button', // Элемент button или Link
  border = false,
  borderColor = 'none',
  borderWidth = '2px',
  buttonFill = 'none',
  buttonElementColor = 'black',
  animationOn = false,
  buttonBorderRadius = '6px',
  disabled = false,
  href = '/',
  onClick,
  extraClass,
  arrowExtraClass,
  arrowColor = '#000000',
  arrowWidth = '24',
  arrowHeight = '24',
  arrowStrokeWidth = '1.5',
  arrowExtraStyles,
  backgroundOpacity,
  extraStyle,
  activeButton
}) => {
  let backgroundColor = 'transparent'

  if (buttonFill !== 'none') {
    const colorMap = {
      'orange-500': '#FD7628',
      'orange-600': '#F8721C',
      'orange-700': '#F06710',
      'bronze-500': '#D38F6D',
      'bronze-600': '#C38566',
      'bronze-700': '#B17759',
      blue: '#11627D',
      'blue-middle': '#11627D',
      'blue-light': '#7A9BB2',
      black: '#000000',
      gray: '#B5B9BE',
      'gray-light': '#CDD0D3',
      white: '#FFFFFF'
    }

    const hexColor = colorMap[buttonFill] || 'transparent'

    if (backgroundOpacity !== undefined) {
      const opacityValue = Number(backgroundOpacity) / 100
      backgroundColor = hexToRgba(hexColor, opacityValue)
    } else {
      backgroundColor = hexColor
    }
  }

  const buttonStyle = {
    backgroundColor
  }

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
          [styles[`butron-border-radius-${buttonBorderRadius}`]]: buttonBorderRadius,
          [styles[`background-opacity-${backgroundOpacity}`]]: backgroundOpacity,
          //! Ниже идут с заливкой
          [styles.active_button_bronze]: activeButton && buttonFill === 'bronze-500',
          [styles.active_button_orange]: activeButton && buttonFill === 'orange-500',
          [styles.active_button_blue_light]: activeButton && buttonFill === 'blue-light',
          [styles.active_button_blue_middle]: activeButton && buttonFill === 'blue-middle',
          [styles.active_button_white]: activeButton && buttonFill === 'white',
          // ! Стили для дизейбл версий
          [styles.disabled]: disabled,
          [styles.disabled_active_button_bronze]: disabled && activeButton && buttonFill === 'bronze-500',
          [styles.disabled_active_button_orange]: disabled && activeButton && buttonFill === 'orange-500',
          [styles.disabled_active_button_white]: disabled && activeButton && buttonFill === 'white',
          [styles.disabled_active_button_gray_transparent]:
            disabled && activeButton && !border && buttonFill === 'gray-light',
          [styles.active_button_arrow_white_disable]:
            activeButton && disabled && buttonFill === 'none' && arrowColor === 'white',
          [styles.active_button_arrow_dark_disable]:
            activeButton && disabled && buttonFill === 'none' && arrowColor === 'dark',
          [styles.active_button_blue_light_disabled]: activeButton && disabled && buttonFill === 'blue-light',
          [styles.active_button_blue_middle_disabled]: activeButton && disabled && buttonFill === 'blue-middle',
          // !Ниже идет серая полупрозрачная
          [styles.active_button_gray_transparent]: activeButton && !border && buttonFill === 'gray-light',
          // !Ниже идут без заливки, только стрелочки
          [styles.active_button_arrow_white]: activeButton && buttonFill === 'none' && arrowColor === 'white',
          [styles.active_button_arrow_dark]: activeButton && buttonFill === 'none' && arrowColor === 'dark'
        },
        extraClass
      )}
      style={{
        ...buttonStyle,
        ...extraStyle
      }}
      onClick={onClick}
    >
      <ArrowIcon
        extraStyle={arrowExtraStyles}
        extraClass={cn(styles.arrow, arrowExtraClass)}
        color={arrowColor === 'white' ? '#fff' : arrowColor === 'dark' ? '#555555' : arrowColor}
        width={arrowWidth}
        height={arrowHeight}
        strokeWidth={arrowStrokeWidth}
      />
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
      style={{
        ...buttonStyle,
        ...extraStyle
      }}
      onClick={onClick}
    >
      <ArrowIcon
        extraStyle={arrowExtraStyles}
        extraClass={cn(styles.arrow, arrowExtraClass)}
        color={arrowColor}
        width={arrowWidth}
        height={arrowHeight}
        strokeWidth={arrowStrokeWidth}
      />
    </Link>
  )
}
