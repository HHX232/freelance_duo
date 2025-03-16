import {FC} from 'react'
interface Props {
  width?: string
  height?: string
  fill?: string
}
export const DashIcon: FC<Props> = ({width = '12', height = '2', fill = '#FFFFFF'}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${Number(width)} ${Number(height)}`}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        transform={`scale(${Number(width) / 12}, ${Number(height) / 2})`}
        d='M0.25 1C0.25 0.585786 0.585786 0.25 1 0.25H11C11.4142 0.25 11.75 0.585786 11.75 1C11.75 1.41421 11.4142 1.75 11 1.75H1C0.585786 1.75 0.25 1.41421 0.25 1Z'
      />
    </svg>
  )
}
