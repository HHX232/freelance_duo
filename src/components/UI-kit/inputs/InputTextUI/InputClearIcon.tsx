interface IInputClearIconProps {
  extraClassName?: string
  onClick?: () => void
  circleSize?: number
  crossSize?: number
  gOpacity?: string
  color?: string
}

const InputClearIcon = ({
  extraClassName = '',
  onClick,
  circleSize = 20,
  crossSize = 9,
  gOpacity = '0.6',
  color = 'white'
}: IInputClearIconProps) => {
  const crossOffset = (circleSize - crossSize) / 2

  return (
    <svg
      className={extraClassName}
      onClick={onClick}
      width={`${circleSize}px`}
      height={`${circleSize}px`}
      viewBox={`0 0 ${circleSize} ${circleSize}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx={circleSize / 2} cy={circleSize / 2} r={circleSize / 2} fill={color} fillOpacity='0.08' />
      <g transform={`translate(${crossOffset} ${crossOffset})`}>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d={`M0 0 L${crossSize} ${crossSize} M${crossSize} 0 L0 ${crossSize}`}
          stroke={color}
          strokeOpacity={gOpacity}
          strokeWidth='2'
          strokeLinecap='round'
        />
      </g>
    </svg>
  )
}

export default InputClearIcon
