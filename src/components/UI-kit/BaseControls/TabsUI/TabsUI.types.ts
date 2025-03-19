type TTabsUIFill = 'white' | 'transparent'
type TTabsSize = 'md' | 'sm'
export interface TabsUIProps {
  fill?: TTabsUIFill
  setActiveTabIndex: (index: number) => void
  tabsNames: string[]
  disabled?: boolean
  activeIndex: number
  size?: TTabsSize
}
