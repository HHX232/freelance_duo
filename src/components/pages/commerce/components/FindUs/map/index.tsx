"use client"
import styles from '@pages/commerce/components/FindUs/map/styles.module.scss'
import {Map, Placemark, YMaps, ZoomControl,GeolocationControl } from '@pbe/react-yandex-maps'
import {FC} from 'react'
import clsx from 'clsx'

interface Props {
  extraClass?: string
  onPinClick?: () => void
}

const CommerceMap: FC<Props> = ({extraClass, onPinClick}) => {

  const onMarkClick = () => {
    if(onPinClick){
      onPinClick()
    }
  }

  return (
    <div className={clsx(styles.contactsMap, extraClass)}>
      <YMaps>
        <Map
          width={1250}
          height={924}
          defaultState={{center: [59.99494649074784, 30.247901999999492], zoom: 9}}
          className={styles.map}
        >
          <Placemark
            geometry={[59.99494649074784, 30.247901999999492]}
            options={{
              iconLayout: "default#image",
              iconImageSize: [60, 65],
              iconImageHref: "/content/commerce/Find_Icon_1.svg",
              openBalloonOnClick: true,
            }}
            onClick={() => {onMarkClick()}}
          />
          <ZoomControl options={{ position:{ right: '24px', top: '200px'}, adjustMapMargin: true, size: 'small'}} />
          <GeolocationControl options={{ position:{ right: '24px', top: "270px"}, adjustMapMargin: true}}/>
        </Map>
      </YMaps>
    </div>
  )
}

export default CommerceMap
