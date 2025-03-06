enum AccordionColors {
  primary = 'accent',
  white = 'white'
}

enum AccordionFonts {
  romul = 'romul',
  gotham = 'gotham'
}

enum AccordionSizes {
  accentSmall = 'accentSmall',
  accentMedium = 'accentMedium',
  accentLarge = 'accentLarge',
  defaultXXL = 'defaultXXL',
  defaultXL = 'defaultXL',
  defaultL = 'defaultL',
  defaultM = 'defaultM',
  defaultS = 'defaultS',
  defaultXS = 'defaultXS'
}

type AccordionColorType = `${AccordionColors}`
type AccordionFontType = `${AccordionFonts}`
type AccordionSizeType = `${AccordionSizes}`
export interface IArrowDopProps {
  leftArrow?: boolean
  rightArrow?: boolean
  arrowSize?: 'large' | 'medium' | 'small'
  arrowExtraStyles?: React.CSSProperties
}
export interface IAccordionItem {
  header: string | React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  color?: AccordionColorType
  font?: AccordionFontType
  size?: AccordionSizeType
}
export interface AccordionTabCustomProps extends IArrowDopProps {
  key: string
  arrowColor?: string
  header: React.ReactNode
  className?: string
  style?: React.CSSProperties
  contentStyle?: React.CSSProperties
  isOpen: boolean
  arrowComponent?: React.ReactNode
  onClick: () => void
}

export interface AccordionProps extends IArrowDopProps {
  items: IAccordionItem[]
  arrowColor?: string
  containerExtraClass?: string
  extraClass?: string
  extraStyle?: React.CSSProperties
  arrowComponent?: React.ReactNode
}
