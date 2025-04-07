import styles from './mapPoint.module.scss'
import {FC} from 'react'
import clsx from 'clsx'

type TSize = 'small' | 'medium' | 'big'

//type TIcon = 'coast' | 'kindergarden' | 'mall' | 'medicine' | 'park' | 'restorant' | 'school' | 'sport' | 'store'

interface IMapPoint {
  icon: string,
  size?: TSize,
  onClick?: () => void
}

const MapPoint: FC<IMapPoint> = ({
  icon,
  size = 'medium',
  onClick
}) => {
  return (
    <div className={clsx(styles[`mapicon-${size}`], styles['mapicon-container'])} onClick={onClick}>
        <img src={`/map/icons/${icon}_icon.svg`} alt={icon} className={styles['mapicon-icon']} />
    </div>
  )
}

export default MapPoint
