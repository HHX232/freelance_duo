import {FC} from 'react'
interface IArrowIcon {
  width?: number | string
  height?: number | string
  extraClass?: string
  extraStyle?: React.CSSProperties
  color?: string
  strokeWidth?: number | string
}

export const ArrowIcon: FC<IArrowIcon> = ({
  width = '24',
  height = '24',
  extraClass,
  extraStyle,
  color = '#FFFFFF',
  strokeWidth = '1.5'
}) => {
  return (
    <svg
      style={extraStyle}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`${extraClass}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6 18L18 6' stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9 6H18V15' stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
