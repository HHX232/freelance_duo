'use client'
import styles from './transportMap.module.scss'
import {YMaps, Map, Placemark, ZoomControl} from '@pbe/react-yandex-maps'
import MapLegend from './mapLegend/mapLegend'
import MapSidebar from './mapSidebar/mapSidebar'
import {FC, useState, useEffect, useRef, ReactNode} from 'react'

interface ITransportMap {
  customPoi?: any[],
  withLegend?: boolean,
  withSidebar?: boolean,
  customSidebar?: ReactNode
}

const TransportMap: FC<ITransportMap> = ({customPoi, withLegend, withSidebar, customSidebar}) => {
  const [showLegend, setShowLegend] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const [ymaps, setYmaps] = useState<any | null>(null)
  const [poi, setPoi] = useState<any[]>()
  const mapRef = useRef<ymaps.Map | undefined>(undefined)

  useEffect(() => {
    if (!mapRef.current || !ymaps) return;

    if(customPoi) {
      //если точки интереса переданы как пропсы, то не ищем на карте
      setPoi(customPoi)
    } else {
      try {
        ymaps.ready(() => {
          if (!mapRef.current) return;
          const map = mapRef.current;
          
          //Создаем поиск по карте
          const searchControl = new ymaps.control.SearchControl({
            options: {
              provider: "yandex#search",
              noPlacemark: true,
              noSuggestPanel: true,
              boundedBy: map.getBounds(), // Искать в пределах видимой области
              strictBounds: true
            },
          });

          map.controls.add(searchControl);
          
          // Выполняем поиск POI детский сад, поликлинника, больница, набережная, ТРЦ, молл, парк, ресторан, магазин, стадион, спорт
          searchControl.search("школа").then(() => {
            const results = searchControl.getResultsArray();
            const points: Array<{ name: string; icon: string; coords: number[] }> = results.map((result: ymaps.Placemark) => ({
              name: result.properties.get("name", {}),
              coords: result.geometry ? result.geometry.getCoordinates() as number[] : [],
              icon: getIconName(`${result.properties.get('name', {})}`)
            }));
            setPoi(points);
            map.controls.remove(searchControl);//прячем с карты поле поиска
          });
        });
      } catch(err) {
        console.error('MAPS-ERR->', err);
      }
    }
  }, [mapRef.current]);
  
  const getIconName = (name: string) => {
    const lname = name.toLowerCase();
    switch (true) {
      case lname.indexOf('школа') !== -1:
          return 'school_icon.svg'
      case lname.indexOf('спорт') !== -1:
          return 'sport_icon.svg'
      case lname.indexOf('фитнесс') !== -1:
          return 'sport_icon.svg'
      case lname.indexOf('детский сад') !== -1:
          return 'kindergarden_icon.svg'
      case lname.indexOf('поликлинника') !== -1:
          return 'medicine_icon.svg'
      case lname.indexOf('больница') !== -1:
          return 'medicine_icon.svg'
      case lname.indexOf('магазин') !== -1:
          return 'store_icon.svg'
      case lname.indexOf('трк') !== -1:
          return 'mall_icon.svg'
      case lname.indexOf('молл') !== -1:
          return 'mall_icon.svg'
      case lname.indexOf('ресторан') !== -1:
          return 'restorant_icon.svg'
      case lname.indexOf('парк') !== -1:
          return 'park_icon.svg'
      case lname.indexOf('набережная') !== -1:
          return 'coast_icon.svg'
      default:
          return 'store_icon.svg'
    }
  }

  const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
   setShowSidebar(!showSidebar)
  }

  return (
    <div className={styles.trmap_container}>
        <YMaps query={{lang: "ru_RU", apikey: "f4f9faf3-0ce8-4dd2-9b67-7843cfeff30f"}}>
            <Map
                defaultState={{center: [59.999685, 29.746311], zoom: 14, controls: []}}
                options={{ suppressMapOpenBlock: true }}
                modules={["control.ZoomControl", "control.FullscreenControl", "control.SearchControl"]}
                instanceRef={mapRef}
                onLoad={(ymapsInstance) => {
                  setYmaps(ymapsInstance)
                }}
                className={styles.trmap_map}
            >
                {showLegend && poi && poi.map((place, index) => {
                    return <Placemark
                    key={index}
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
                <ZoomControl options={{ position:{ right: '24px', top: '200px'}, adjustMapMargin: true, size: 'small'}} />
            </Map>
            {withLegend ? <MapLegend switchVisibility={(show) => setShowLegend(show)}/> : null}
            {withSidebar ? <MapSidebar isOpen={showSidebar}/> : null}
            {withSidebar ? <button className={showSidebar ? styles.sidebar_button_show : styles.sidebar_button_hide} onClick={toggleSidebar}>
              {showSidebar ? '>>' : '<<'}
            </button> : null}
        </YMaps>
    </div>
  )
}

export default TransportMap
