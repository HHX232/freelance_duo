'use client'
import styles from './pin.module.scss'
import {PinType} from '@pages/map/model'
import PinSVG from '@icons/pin.svg'
import PinBGSVG from '@icons/pin_bg.svg'
import clsx from 'clsx'
import {useIsTablet} from '@utils/useIsMobile'

const Pin = ({name, coords, coords_mob, onClick, isActive}: PinType) => {
  const isTablet = useIsTablet(1441)

  const activeCoords = isTablet && coords_mob ? coords_mob : coords

  return (
    <div
      className={clsx(styles.pin_container, isActive && isTablet && styles.active)}
      style={{
        top: `${activeCoords.y}%`,
        left: `${activeCoords.x}%`
      }}
      onClick={onClick}
    >
      <div className={styles.wrap}>
        <PinSVG className={styles.icon} />
        <div className={styles.overlay}>
          <div className={styles.name_container}>
            <PinBGSVG />
            <div className={styles.name}>
              <p>{name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pin
