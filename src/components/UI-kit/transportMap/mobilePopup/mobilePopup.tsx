import {Drawer} from 'antd'
import {FC} from 'react'
import styles from './mobilePopup.module.scss'
import {YMaps, Map, Placemark, GeoObject, Clusterer} from '@pbe/react-yandex-maps'
import MapSidebar from '../mapSidebar/mapSidebar'
import {mapPoi, mapRoutes} from '@src/lib/utils/catalog/mapMockData'
import MapPoint from '@shared/mapPoint/mapPoint'
import {CloseButton} from '../../BaseControls/buttons/close-button'

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
        <YMaps query={{lang: 'ru_RU', apikey: 'f4f9faf3-0ce8-4dd2-9b67-7843cfeff30f'}}>
          <Map
            defaultState={{center: [59.999685, 29.746311], zoom: 14, controls: []}}
            defaultOptions={{}}
            options={{suppressMapOpenBlock: true}}
            controls={[]}
            modules={['control.FullscreenControl', 'control.SearchControl', 'control.RoutePanel']}
            className={styles.mobile_map}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: true, // Группировать точки с одинаковыми координатами
                clusterDisableClickZoom: false, // Разрешить зум на кластере
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
              }}
            >
              {mapPoi &&
                mapPoi.map((place, index) => {
                  return (
                    <Placemark
                      key={index}
                      geometry={place.coords}
                      properties={{hintContent: place.name, balloonContentBody: place.name}}
                      modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                      options={{
                        iconLayout: 'default#image',
                        iconImageHref: `/map/icons/${place.icon}`,
                        iconImageSize: /кронфорт/gi.test(place.name) ? [60, 60] : [30, 30]
                      }}
                    />
                  )
                })}
            </Clusterer>

            {mapRoutes &&
              mapRoutes.map((route, index) => (
                <GeoObject
                  key={index}
                  geometry={{
                    type: 'LineString',
                    coordinates: route.points
                  }}
                  options={{
                    strokeColor: route.color,
                    strokeWidth: route.lineWidth,
                    strokeStyle: 'dash' // Пунктирная линия
                  }}
                />
              ))}
          </Map>
        </YMaps>
        <div className={styles.mobile_infoblock}>
          <div className={styles.infoblock_line}></div>
          <h4 className={styles.infoblock_title}>ОБОЗНАЧЕНИЯ</h4>
          <MapSidebar isOpen={true} isMobile />
          <h4 className={styles.infoblock_title}>ИНФРАСТРУКТУРА</h4>
          <div className={styles['maplegend-legend']}>
            {legendItems.map((item) => {
              return (
                <div key={item.text} className={styles['maplegend-legend-item']}>
                  <MapPoint icon={item.icon} />
                  <p>{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default MobilePopup
