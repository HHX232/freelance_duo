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

export interface IAccordionItem {
  header: string | React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  color?: AccordionColorType
  font?: AccordionFontType
  size?: AccordionSizeType
}
export interface AccordionTabCustomProps {
  key: string
  header: React.ReactNode
  className?: string
  style?: React.CSSProperties
  contentStyle?: React.CSSProperties
  isOpen: boolean
  arrowComponent?: React.ReactNode
  onClick: () => void
}

export interface AccordionProps {
  items: IAccordionItem[]
  extraClass?: string
  extraStyle?: React.CSSProperties
}
