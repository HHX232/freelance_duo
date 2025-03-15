'use client'
import styles from './transportMap.module.scss'
import {YMaps, Map, Placemark, ZoomControl} from '@pbe/react-yandex-maps'
import MapLegend from '../mapLegend/mapLegend'
import MapSidebar from '../mapSidebar/mapSidebar'
//import { Button } from 'antd'
import {useState} from 'react'

const TransportMap = () => {
  const [showLegend, setShowLegend] = useState(true)

  const places = [
    { coords: [60.008737, 29.722807], name: "Школа №418", icon: 'school_icon.svg' },
    { coords: [60.001739, 29.736115], name: "Фитнесс - центр Кронштадт", icon: 'sport_icon.svg' },
    { coords: [59.995228, 29.738593], name: "Детский сад", icon: 'kindergarden_icon.svg' },
    { coords: [59.994020, 29.748576], name: "Школа", icon: 'school_icon.svg' },
    { coords: [59.998730, 29.758308], name: "Ресторан", icon: 'restorant_icon.svg' },
    { coords: [59.996172, 29.757292], name: "Детская поликлинника", icon: 'medicine_icon.svg' },
    { coords: [59.989298, 29.763328], name: "Парк", icon: 'park_icon.svg' },
  ]

  return (
    <div className={styles.trmap_container}>
        <YMaps>
            <Map
                defaultState={{center: [59.999685, 29.746311], zoom: 14, controls: []}}
                options={{ suppressMapOpenBlock: true }}
                modules={["control.ZoomControl", "control.FullscreenControl"]}
                className={styles.trmap_map}
            >
                {showLegend && places.map((place, index) => {
                    return <Placemark
                    key={index}
                    geometry={place.coords}
                    properties={{ hintContent: place.name, balloonContentBody: place.name }}
                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    options={{
                      iconLayout: "default#image",
                      iconImageHref: `/map/icons/${place.icon}`,
                      iconImageSize: [30, 30],
                    }}
                  />
                })}
                <ZoomControl options={{ position:{ right: '24px', top: '200px'}, adjustMapMargin: true, size: 'small'}} />
            </Map>
            <MapLegend switchVisibility={(show) => setShowLegend(show)}/>
            <MapSidebar />
            {/* <Button name='>>' onClick={() => setShowLegend(true)}/> */}
        </YMaps>
    </div>
  )
}

export default TransportMap
