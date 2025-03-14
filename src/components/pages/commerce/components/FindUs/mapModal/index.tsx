'use client'

import {FC, useState} from 'react'
import styles from './styles.module.scss'
import CommerceMap from '@pages/commerce/components/FindUs/map'
import Map from '@icon/map.svg'
import ClockIcon from '@icon/commerce_clock.svg'
import CloseIcon from '@icon/WhiteCloseIcon.svg'
import BlueCloseIcon from '@icon/CloseIcon.svg'

interface Props {
  closeModal: () => void
}

const MapModal: FC<Props> = ({closeModal}) => {

  const [isInfo, setInfo] = useState<boolean>(false)
  const openInfo = () => {
    setInfo(true)
  }

  return (
    <div className={styles.mapModal} onClick={(e) => e.stopPropagation()}>
      <CloseIcon className={styles.closeButton} onClick={closeModal}/>
      <div className={styles.mapWrapper}>
        <CommerceMap onPinClick={openInfo} extraClass={styles.mapExtra}/>
      </div>
      <div className={`${styles.infoCard} ${ isInfo && styles.activeInfo}`}>
        <div className={styles.infoCardClose}>
          <BlueCloseIcon onClick={() => setInfo(false)}/>
        </div>
        <div className={styles.infoInnerWrapper}>
          <div className={`${styles.infoTitle}`}>Отдел продаж</div>
          <div className={`${styles.infoBody}`}>
            <div className={styles.textWrapper}>
              <Map />
              <div className={`${styles.text}`}>
                ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»
              </div>
            </div>
            <div className={styles.textWrapper}>
              <ClockIcon />
              <div className={`${styles.text}`}>
                <div>По будням: с 9:30 до 18:00</div>
                <div>Выходные: суббота – воскресенье</div>
              </div>
            </div>
          </div>
          <div className={`${styles.infoFooter}`}>
            <div className={styles.footerTitle}>+7 812 602 20 10</div>
            <div className={styles.footerSub}>телефон для связи</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapModal
