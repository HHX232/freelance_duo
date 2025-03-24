import {FC} from 'react'
import {TabsUIProps} from './TabsUI.types'
import cn from 'clsx'
import styles from './TabsUI.module.scss'

interface TabsUIItemProps {
  tabName: string
  index: number
  fill?: 'white' | 'dark' | 'transparent'
  setActiveTabIndex: (index: number) => void
  disabled?: boolean
  activeIndex: number
  size?: 'sm' | 'md'
  extraClass?: string
}

export const TabsUIItem: FC<TabsUIItemProps> = ({
  tabName,
  index,
  fill = 'transparent',
  setActiveTabIndex,
  disabled = false,
  activeIndex,
  size,
  extraClass
}) => {
  const isActive = activeIndex === index

  const handleClick = () => {
    if (!disabled) {
      setActiveTabIndex(index)
    }
  }

  return (
    <div
      className={cn(
        styles.tabItem,
        {
          [styles.active]: isActive,
          [styles.disabled]: disabled,
          [styles.fill_white]: fill === 'white',
          [styles.fill_transparent]: fill === 'transparent',
          [styles.size_sm]: size === 'sm',
          [styles.size_md]: size === 'md'
        },
        extraClass
      )}
      onClick={handleClick}
      role='tab'
      aria-selected={isActive}
      aria-disabled={disabled}
    >
      {tabName}
    </div>
  )
}

const TabsUI: FC<TabsUIProps> = ({
  fill = 'transparent',
  setActiveTabIndex,
  tabsNames,
  disabled = false,
  activeIndex = 0,
  size = 'md',
  extraClass
}) => {
  return (
    <div
      className={cn(
        styles.tabsContainer,
        {
          [styles.size_box_sm]: size === 'sm',
          [styles.size_box_md]: size === 'md',
          [styles.fill_box_transparent]: fill === 'transparent'
        },
        extraClass
      )}
      role='tablist'
    >
      {tabsNames.map((name, index) => (
        <TabsUIItem
          size={size}
          tabName={name}
          key={index}
          index={index}
          fill={fill}
          setActiveTabIndex={setActiveTabIndex}
          disabled={disabled}
          activeIndex={activeIndex}
        />
      ))}
    </div>
  )
}

export default TabsUI
