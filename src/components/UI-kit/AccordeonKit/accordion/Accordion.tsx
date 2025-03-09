'use client'
import {useState, useMemo, useCallback} from 'react'
import styles from './accordion.module.scss'
import {AccordionProps, AccordionTabCustomProps} from './accordion.types'
import cn from 'clsx'
import {AccordionArrow} from '@src/components/UI-kit/AccordeonKit/accordionArrow/accordionArrow'

// TODO допроверить пропсы
const AccordionTabCustom = ({
  key,
  header,
  className,
  style,
  contentStyle,
  isOpen = false,
  onClick,
  animationOn,
  arrowComponent,
  leftArrow,
  rightArrow,
  arrowSize = 'large',
  arrowExtraStyles,
  decorUnderLine = true,
  arrowColor,
  children
}: AccordionTabCustomProps & {children: React.ReactNode}) => {
  return (
    <div
      className={cn(styles.li_item, className, {
        [styles.open]: isOpen,
        [styles.animationOn]: animationOn,
        [styles.animationOff]: !animationOn
      })}
      style={style}
      key={key}
    >
      <div className={styles.header} onClick={onClick}>
        {header}
        {arrowComponent || (
          <AccordionArrow
            leftArrow={leftArrow}
            rightArrow={rightArrow}
            arrowState={isOpen}
            arrowColor={arrowColor}
            size={arrowSize}
            extraStyles={arrowExtraStyles}
          />
        )}
      </div>
      {decorUnderLine && <div className={styles.decor_line}></div>}
      <div
        style={contentStyle}
        className={cn(styles.content, {
          [styles.contentActive]: isOpen,
          [styles.animationOn]: animationOn,
          [styles.animationOff]: !animationOn
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default function Accordion({
  items,
  containerExtraClass,
  extraClass,
  extraStyle,
  arrowComponent,
  leftArrow,
  rightArrow,
  arrowSize,
  animationOn = true,
  arrowColor,
  onClick,
  decorUnderLine,
  forceIsOpen,
  arrowExtraStyles
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleTabClick = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }, [])

  const tabs = useMemo(() => {
    return items.map((tab, i) => (
      <AccordionTabCustom
        arrowColor={arrowColor}
        arrowComponent={arrowComponent}
        leftArrow={leftArrow}
        decorUnderLine={decorUnderLine}
        rightArrow={rightArrow}
        arrowSize={arrowSize}
        arrowExtraStyles={arrowExtraStyles}
        key={i.toString()}
        animationOn={animationOn}
        header={tab?.header}
        isOpen={forceIsOpen !== undefined ? forceIsOpen : openIndex === i}
        onClick={() => handleTabClick(i)}
        className={cn(
          styles.item,
          {
            [styles.white_text]: tab?.color === 'white',
            [styles.accent_text]: tab?.color !== 'white',
            [styles.romul_text]: tab?.font === 'romul',
            [styles.gotham_text]: tab?.font === 'gotham',
            [styles.gotham_text]: tab?.font !== 'romul',
            [styles.accentSmall_text]: tab?.size === 'accentSmall',
            [styles.accentMedium_text]: tab?.size === 'accentMedium',
            [styles.accentLarge_text]: tab?.size === 'accentLarge',
            [styles.defaultXXL]: tab?.size === 'defaultXXL',
            [styles.defaultXL]: tab?.size === 'defaultXL',
            [styles.defaultL]: tab?.size === 'defaultL',
            [styles.defaultM]: tab?.size === 'defaultM',
            [styles.defaultS]: tab?.size === 'defaultS',
            [styles.defaultXS]: tab?.size === 'defaultXS',
            [styles.animationOn]: animationOn,
            [styles.animationOff]: !animationOn
          },
          extraClass
        )}
        style={extraStyle}
      >
        {tab?.children}
      </AccordionTabCustom>
    ))
  }, [items, extraClass, extraStyle, openIndex, handleTabClick])

  return (
    <div
      onClick={onClick}
      className={cn(
        styles.accordion,
        {[styles.animationOn]: animationOn, [styles.animationOff]: !animationOn},
        containerExtraClass
      )}
    >
      {tabs}
    </div>
  )
}
