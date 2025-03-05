import styles from './accordionArrow.module.scss'

type TArrowSize = 'large' | 'small'
export interface AccordionArrowProps {
  arrowState: boolean
  leftArrow?: boolean
  rightArrow?: boolean
  size?: TArrowSize | string
  extraStyles?: React.CSSProperties
}

export const AccordionArrow = ({
  arrowState,
  leftArrow = true,
  rightArrow = true,
  size = 'large',
  extraStyles
}: AccordionArrowProps) => {
  return (
    <>
      {leftArrow && (
        <svg
          style={{
            transform: arrowState ? 'rotate(-180deg)' : 'rotate(0deg)',
            ...extraStyles
          }}
          className={styles.arrow}
          width={size === 'large' ? '15' : '8'}
          height={size === 'large' ? '9' : '5'}
          viewBox='0 0 18 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.5 1.25L9 8.75L16.5 1.25'
            stroke='#FDF1CD'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
      {rightArrow && (
        <svg
          style={{
            transform: arrowState ? 'rotate(-180deg)' : 'rotate(0deg)',
            ...extraStyles
          }}
          className={`${styles.arrow} ${styles.arrow_right}`}
          width={size === 'large' ? '15' : '8'}
          height={size === 'large' ? '9' : '5'}
          viewBox='0 0 18 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.5 1.25L9 8.75L16.5 1.25'
            stroke='#FDF1CD'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </>
  )
}
