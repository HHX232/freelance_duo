"use client"
import {Drawer} from 'antd'
import {FC, useState, useEffect} from 'react'
import styles from './mobilePopup.module.scss'
import {YMaps} from '@pbe/react-yandex-maps'
import MapSidebar from '../mapSidebar/mapSidebar'
import { mapPoi, mapRoutes, mapKFPoi } from '@src/lib/utils/catalog/mapMockData'
import MapPoint from '@shared/mapPoint/mapPoint'
import {CloseButton} from '../../BaseControls/buttons/close-button'
import { MapWithClusters } from '../transportMap'

interface ITransportModalProps {
  shown: boolean
  onClose: () => void
}

const MobilePopup: FC<ITransportModalProps> = ({shown, onClose}) => {
  const legendItems = [
    {icon: 'school', text: 'Школы'},
    {icon: 'kindergarden', text: 'Детские сады'},
    {icon: 'medicine', text: 'Медицина'},
    {icon: 'sport', text: 'Спорт'},
    {icon: 'store', text: 'Магазины'},
    {icon: 'mall', text: 'ТРК'},
    {icon: 'restorant', text: 'Рестораны'},
    {icon: 'park', text: 'Парки'},
    {icon: 'coast', text: 'Набережная'}
  ]
    const [hasTouch, setHasTouch] = useState(false);
    // const [y, setY] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (window && "ontouchstart" in window || navigator && navigator.maxTouchPoints > 0) setHasTouch(true)
    },[])

    const handleTouchEnd = () => {
      setOpen(!open)
        // if (y < window.innerHeight / 2) {
        // setOpen(true);
        // } else {
        // setOpen(false);
        // }
    };

    const handleClick = () => {
        console.log('CLICK->', open);
        setOpen(!open)
    }

  return (
    <Drawer
      bodyStyle={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
      placement={'right'}
      closable={false}
      onClose={onClose}
      open={shown}
      contentWrapperStyle={{
        width: '100%'
      }}
    >
      <div className={styles.head}>
        <CloseButton className={styles.headClose} onClick={onClose} />
      </div>

      <div className={styles.mobile_content}>
        <YMaps query={{lang: "ru_RU", apikey: "f4f9faf3-0ce8-4dd2-9b67-7843cfeff30f"}}>
          <MapWithClusters
            mapPoi={mapPoi} 
            mapKFPoi={mapKFPoi} 
            showLegend={true}
            customRoutes={mapRoutes || []}
            mapZoom={14}
            wrapperClass='mobile_map'
          />
            {/* <Map
                defaultState={{center: [59.999685, 29.746311], zoom: 14, controls: []}}
                defaultOptions={{}}
                options={{ suppressMapOpenBlock: true }}
                controls={[]}
                modules={[
                  "control.FullscreenControl",
                  "control.SearchControl",
                  "control.RoutePanel"
                ]}
                className={styles.mobile_map}
            >
              <Clusterer 
                options={{
                  preset: "islands#invertedVioletClusterIcons",
                  groupByCoordinates: false, // Группировать точки с одинаковыми координатами
                  clusterDisableClickZoom: false, // Разрешить зум на кластере
                  clusterHideIconOnBalloonOpen: false,
                  geoObjectHideIconOnBalloonOpen: false,
                  gridSize: 64
                }}
              >
                {mapPoi && mapPoi.map((place, index) => {
                    return <Placemark
                    key={place.name + index}
                    geometry={place.coords}
                    properties={{ hintContent: place.name, balloonContentBody: place.name }}
                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    options={{
                      iconLayout: "default#image",
                      iconImageHref: `/map/icons/${place.icon}`,
                      iconImageSize: /кронфорт/gi.test(place.name) ? [60, 60] : [30, 30],
                    }}
                  />
                })}
              </Clusterer>

              { mapKFPoi && mapKFPoi.map((place, index) => {
                    return <Placemark
                    key={index}
                    geometry={place.coords}
                    properties={{ hintContent: place.name, balloonContentBody: place.name }}
                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    options={{
                      iconLayout: "default#image",
                      iconImageHref: `/map/icons/${place.icon}`,
                      iconImageSize: [60, 60],
                    }}
                  />
                })}

                {mapRoutes && mapRoutes.map((route, index) => (
                    <>
                        <GeoObject
                            key={route.hint}
                            geometry={{
                            type: "LineString",
                            coordinates: route.points,
                            }}
                            options={{
                            strokeColor: route.color,
                            strokeWidth: route.lineWidth,
                            strokeStyle: "dash",
                            }}
                        />
                        <Placemark
                            key={index}
                            geometry={route.arrow.coords}
                            modules={['geoObject.addon.balloon']}
                            options={{
                                iconLayout: "default#image",
                                iconImageHref: `/map/icons/arrow_${route.arrow.direction}.svg`,
                                iconColor: route.color,
                                iconImageSize: [20, 20],
                                iconImageOffset: [-10, -10]
                            }}
                        />
                    </>
                ))}
            </Map> */}
        </YMaps>
        <div className={`${styles.mobile_infoblock} ${open ? styles.ib_open : styles.ib_close}`}>
            <div className={styles.line_container}
              {...(hasTouch ? 
                {
                  //onTouchMove: handleTouchMove,
                  onTouchEnd: handleTouchEnd
                } :
                {onClick: handleClick})}
            >
                <div className={styles.infoblock_line}></div>
                <h4 className={styles.infoblock_title}>ОБОЗНАЧЕНИЯ</h4>
            </div>
            {open && <>
                <MapSidebar isOpen={true} isMobile/>
                <h4 className={styles.infoblock_title_small}>ИНФРАСТРУКТУРА</h4>
                <div className={styles['maplegend-legend']}>
                    {legendItems.map(item => {
                        return <div key={item.text} className={styles['maplegend-legend-item']}>
                            <MapPoint icon={item.icon} />
                            <p>{item.text}</p>
                        </div>
                    })}
                </div>
            </>}            
        </div>
      </div>
    </Drawer>
  )
}

export default MobilePopup
