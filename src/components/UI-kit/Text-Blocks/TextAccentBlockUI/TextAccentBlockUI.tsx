import {FC} from 'react'
import styles from './TextAccentBlockUI.module.scss'
import ITextAccentBlockUIProps from './TextAccentBlockUI.types'
import cn from 'clsx'
import H2Title from '../../Text-Elements/Typography/Headers/H2Title'
import H4Title from '../../Text-Elements/Typography/Headers/H4Title'
import ParagraphUI from '../../Text-Elements/Typography/Paragraph/Paragraph'

const TextAccentDecorElement = ({
  decorClass,
  extraDecorElementClass
}: {
  decorClass: string
  extraDecorElementClass?: string
}) => {
  return (
    <svg
      className={cn(decorClass, extraDecorElementClass)}
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M39.9999 39.3716L39.9999 0.000116535L0.628905 0.000118256C22.3732 0.000117305 39.9999 17.6271 39.9999 39.3716Z'
        fill='#FD7628'
      />
    </svg>
  )
}

const TextAccentBlockUI: FC<ITextAccentBlockUIProps> = ({
  textTitle,
  textSubTitle,
  textMainContent,
  hideTitle,
  hideSubTitle,
  hideMainContent,
  hideDecorElement,
  hideUnderline,
  theme = 'white',
  extraTitleClass,
  extraSubTitleClass,
  extraMainContentClass,
  extraDecorElementClass,
  extraUnderlineClass,
  extraContainerClass
}) => {
  return (
    <div className={cn(styles.container, extraContainerClass, styles[`theme_${theme}`])}>
      {!hideDecorElement && <TextAccentDecorElement decorClass={cn(styles.decor_el, extraDecorElementClass)} />}
      <span className={styles.text_box}>
        {!hideTitle && (
          <H2Title
            className={cn(
              {
                [styles.title_white]: theme === 'white',
                [styles.title_dark]: theme === 'dark'
              },
              extraTitleClass
            )}
          >
            {textTitle}
          </H2Title>
        )}

        {!hideSubTitle && (
          <H4Title
            className={cn(
              {
                [styles.subTitle_white]: theme === 'white',
                [styles.subTitle_dark]: theme === 'dark'
              },
              extraSubTitleClass
            )}
          >
            {textSubTitle}
          </H4Title>
        )}
      </span>
      {!hideUnderline && <div className={cn(styles.decor_underline, extraUnderlineClass)}></div>}
      {!hideMainContent && (
        <ParagraphUI
          extraClass={cn(
            {[styles.text_white]: theme === 'white', [styles.text_dark]: theme === 'dark'},
            extraMainContentClass
          )}
          size='md'
          weight='light'
        >
          {textMainContent}
        </ParagraphUI>
      )}
    </div>
  )
}

export default TextAccentBlockUI
