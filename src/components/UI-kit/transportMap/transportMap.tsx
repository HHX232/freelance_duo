'use client'
import styles from './transportMap.module.scss'
import {YMaps, Map, Placemark, ZoomControl, GeoObject, Clusterer} from '@pbe/react-yandex-maps'
import MapLegend from './mapLegend/mapLegend'
import MapSidebar from './mapSidebar/mapSidebar'
import MobilePopup from './mobilePopup/mobilePopup'
import {FC, useState, useEffect, useRef, ReactNode} from 'react'

interface ITransportMap {
  customPoi?: any[],
  customRoutes?: any[],
  withLegend?: boolean,
  withSidebar?: boolean,
  customSidebar?: ReactNode
}

const TransportMap: FC<ITransportMap> = ({customPoi, customRoutes, withLegend, withSidebar, customSidebar}) => {
  const [showLegend, setShowLegend] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const [ymaps, setYmaps] = useState<any | null>(null)
  const [poi, setPoi] = useState<any[]>()
  const mapRef = useRef<ymaps.Map | undefined>(undefined)
  const [zoom, setZoom] = useState(14);
  const [modalView, setModalView] = useState(false);

  const handleZoom = (delta: number) => {
    if (mapRef.current) {
      const newZoom = Math.max(2, Math.min(19, zoom + delta));
      setZoom(newZoom);
      mapRef.current.setZoom(newZoom, { duration: 200 });
    }
  };

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
          
          // Выполняем поиск POI школа, детский сад, поликлинника, больница, набережная, ТРЦ, молл, парк, ресторан, магазин, стадион, спорт
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

          //возможная реализация маршрутов, но отрисовывает только один и невозможно с карты спрятать панель поиска маршрута
          // if(customRoutes) {
          //   const routePanelControl = new ymaps.control.RoutePanel({
          //     options: {
          //       float: "right",
          //     },
          //   });
          //   map.controls.add(routePanelControl);
          //   // Указываем начальную и конечную точки маршрута
          //   for (let route of customRoutes) {
          //     routePanelControl.routePanel.state.set({
          //       from: route.points[0],
          //       to: route.points[1],
          //       type: "auto",
          //     });
              
          //     routePanelControl.routePanel.getRouteAsync().then((route: any) => {
          //       route.options.set({
          //         strokeColor: route.color,
          //         strokeWidth: route.lineWidth,
          //         strokeStyle: "dash", // Делаем пунктирный маршрут
          //       });
          //     });
          //   }
          //   //прячем с карты панель маршрута
          //   map.controls.remove(routePanelControl);
          // }
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

  const handleExpandMap = () => {
    setModalView(true)
  }

  return (
    <div className={styles.trmap_container}>
        <YMaps query={{lang: "ru_RU", apikey: "f4f9faf3-0ce8-4dd2-9b67-7843cfeff30f"}}>
            <Map
                defaultState={{center: [59.999685, 29.746311], zoom: 14, controls: []}}
                defaultOptions={{}}
                options={{ suppressMapOpenBlock: true }}
                controls={[]}
                modules={[
                  "control.FullscreenControl",
                  "control.SearchControl",
                  "control.RoutePanel"
                ]}
                instanceRef={mapRef}
                onLoad={(ymapsInstance) => {
                  setYmaps(ymapsInstance)
                }}
                className={styles.trmap_map}
            >
              <Clusterer 
                options={{
                  preset: "islands#invertedVioletClusterIcons",
                  groupByCoordinates: true, // Группировать точки с одинаковыми координатами
                  clusterDisableClickZoom: false, // Разрешить зум на кластере
                  clusterHideIconOnBalloonOpen: false,
                  geoObjectHideIconOnBalloonOpen: false,
                }}
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
              </Clusterer>

                {showLegend && customRoutes && customRoutes.map((route, index) => (
                  <GeoObject
                    key={index}
                    geometry={{
                      type: "LineString",
                      coordinates: route.points,
                    }}
                    options={{
                      strokeColor: route.color,
                      strokeWidth: route.lineWidth,
                      strokeStyle: "dash", // Пунктирная линия
                    }}
                  />
                ))}
            </Map>
            {/* Кастомные zoom кнопки */}
            <div className={`${styles.zoom_controls} ${showSidebar ? styles.zoom_controls_expand : ''}`}>
              <button className={styles.zoom_btn} onClick={() => handleZoom(1)}>+</button>
              <button className={styles.zoom_btn} onClick={() => handleZoom(-1)}>−</button>
            </div>
            <button className={styles.mobile_expand_btn} onClick={handleExpandMap}>СМОТРЕТЬ НА КАРТЕ</button>
            {withLegend ? <MapLegend switchVisibility={(show) => setShowLegend(show)}/> : null}
            {withSidebar ? <MapSidebar isOpen={showSidebar}/> : null}
            {withSidebar ? <button className={showSidebar ? styles.sidebar_button_show : styles.sidebar_button_hide} onClick={toggleSidebar}>
              {showSidebar ? <img src='/map/icons/shevron_icon_right.svg' /> : <img src='/map/icons/shevron_icon_left.svg' />}
            </button> : null}
        </YMaps>
        <MobilePopup shown={modalView} onClose={() => setModalView(false)} />
    </div>
  )
}

export default TransportMap
