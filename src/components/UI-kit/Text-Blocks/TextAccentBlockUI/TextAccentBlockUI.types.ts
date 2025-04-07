type TTextTheme = 'white' | 'dark'
interface ITextAccentBlockUIProps {
  textTitle: string | React.ReactNode
  textSubTitle: string | React.ReactNode
  textMainContent: string | React.ReactNode
  hideTitle?: boolean
  hideSubTitle?: boolean
  hideMainContent?: boolean
  hideDecorElement?: boolean
  hideUnderline?: boolean
  theme?: TTextTheme
  extraTitleClass?: string
  extraSubTitleClass?: string
  extraMainContentClass?: string
  extraDecorElementClass?: string
  extraUnderlineClass?: string
  extraContainerClass?: string
}

export default ITextAccentBlockUIProps
