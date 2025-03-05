'use client'
import {useState, useMemo, useCallback} from 'react'
import styles from './accordion.module.scss'
import {IAccordionItem} from './accordion.types'
import cn from 'clsx'
import {AccordionArrow} from '@shared/accordionArrow/accordionArrow'

interface AccordionTabCustomProps {
  key: string
  header: React.ReactNode
  className?: string
  style?: React.CSSProperties
  contentStyle?: React.CSSProperties
  isOpen: boolean
  arrowComponent?: React.ReactNode
  onClick: () => void
}

const AccordionTabCustom = ({
  key,
  header,
  className,
  style,
  contentStyle,
  isOpen = false,
  onClick,
  arrowComponent,
  children // This is now implicitly passed by React
}: AccordionTabCustomProps & {children: React.ReactNode}) => {
  return (
    <li className={cn(styles.li_item, className, {[styles.open]: isOpen})} style={style} key={key}>
      <div className={styles.header} onClick={onClick}>
        {header}
        {arrowComponent || <AccordionArrow arrowState={isOpen} />}
      </div>
      <div className={styles.decor_line}></div>
      <div style={contentStyle} className={styles.content}>
        {children}
      </div>
    </li>
  )
}

export interface AccordionProps {
  items: IAccordionItem[]
  extraClass?: string
  extraStyle?: React.CSSProperties
}

export default function Accordion({items, extraClass, extraStyle}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleTabClick = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }, [])

  const tabs = useMemo(() => {
    return items.map((tab, i) => (
      <AccordionTabCustom
        key={i.toString()}
        header={tab?.header}
        isOpen={openIndex === i}
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
            [styles.defaultXS]: tab?.size === 'defaultXS'
          },
          extraClass
        )}
        style={extraStyle}
      >
        {tab?.children} {/* Nest children here */}
      </AccordionTabCustom>
    ))
  }, [items, extraClass, extraStyle, openIndex, handleTabClick])

  return <div className={styles.accordion}>{tabs}</div>
}
