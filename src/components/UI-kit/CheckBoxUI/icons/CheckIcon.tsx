import {FC} from 'react'
interface Props {
  width?: string
  height?: string
  fill?: string
}
export const CheckIcon: FC<Props> = ({width = '16', height = '12', fill = '#FFFFFF'}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${Number(width)} ${Number(height)}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
    >
      <path
        transform={`scale(${Number(width) / 16}, ${Number(height) / 12})`}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.2014 0.888513C15.4933 1.18243 15.4917 1.6573 15.1977 1.94917L5.96698 11.1158C5.67452 11.4063 5.20249 11.4063 4.91002 11.1158L0.807458 7.04176C0.513547 6.74989 0.511892 6.27502 0.803763 5.98111C1.09563 5.68719 1.5705 5.68554 1.86442 5.97741L5.4385 9.52668L14.1408 0.884818C14.4347 0.592947 14.9096 0.594601 15.2014 0.888513Z'
        fill={fill}
      />
    </svg>
  )
}
