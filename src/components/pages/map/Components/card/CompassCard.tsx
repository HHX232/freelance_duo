import {useIsMobile} from '@utils/useIsMobile'
import clsx from 'clsx'
import styles from './Card.module.scss'
import CancelSVG from '@icon/cancel.svg'
import CardLeftSide from '@icon/card.svg'
import Link from 'next/link'
import BorderedButton from '@src/components/UI-kit/BaseControls/buttons/old/borderedButton/BorderedButton'
import {CardProps} from './Compass'

const CompassCard = ({
  name,
  text,
  color,
  coords,
  onEnterCard,
  onLeaveCard,
  onClickCloseCard,
  isVisible,
  style
}: CardProps) => {
  const isMobile = useIsMobile()
  return (
    <div
      className={clsx(styles.wrapper, {[styles.wrapperVisible]: isVisible})}
      style={{top: !isMobile ? `${coords?.y}px` : '', left: !isMobile ? `${coords?.x}px` : '', ...style}}
      onMouseEnter={onEnterCard}
      onMouseLeave={onLeaveCard}
    >
      <div className={styles.compass_content}>
        {isMobile && <CancelSVG className={styles.close} onClick={onClickCloseCard} />}
        <div className={styles.leftSide}>
          <CardLeftSide style={{color}} className={styles.leftSvg} />
          <span className={styles.title}>{name}</span>
        </div>
        <div className={clsx(styles.rightSide, name !== 'Набережная' ? styles.naberejnaya : '')}>
          <p>{text}</p>
          {name !== 'Набережная' ? (
            <Link href={'/planirovki-i-ceny'}>
              <BorderedButton style={{borderColor: color, color}} className={styles.button}>
                Подобрать квартиру
              </BorderedButton>
            </Link>
          ) : (
            <div className={styles.text}>Скоро в продаже!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompassCard
