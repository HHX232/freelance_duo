'use client'
import styles from './transportMap.module.scss'
import {YMaps, Map, Placemark, GeoObject, Clusterer, useYMaps} from '@pbe/react-yandex-maps'
import MapLegend from './mapLegend/mapLegend'
import MapSidebar from './mapSidebar/mapSidebar'
import MobilePopup from './mobilePopup/mobilePopup'
import CustomPlacemark from './customPlacemark'
import {FC, useState, useEffect, useRef, useCallback} from 'react'
import { mapKFPoi } from '@src/lib/utils/catalog/mapMockData'
import {useIsMobile, useIsTablet} from '@utils/useIsMobile'

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

interface MapWithClustersProps {
  mapPoi?: Array<{ name: string; coords: number[]; icon: string }>;
  mapKFPoi?: Array<{ name: string; coords: number[]; icon: string }>;
  showLegend: boolean;
  customRoutes: any[];//Array<{ points: number[][]; arrow: any; color: string; lineWidth: number; hint: string}>;
  mapZoom: number;
  wrapperClass?: string;
}

export const MapWithClusters: FC<MapWithClustersProps> = ({ mapPoi, mapKFPoi, showLegend, customRoutes, mapZoom, wrapperClass }) => {
  const ymapsFactory = useYMaps(["templateLayoutFactory"]); // Дожидаемся загрузки API

  const mapRef = useRef<ymaps.Map | undefined>(undefined)
  const [ymaps, setYmaps] = useState<any | null>(null)
  const [poi, setPoi] = useState<any[]>()
  const [zoom, setZoom] = useState(14);
  const [hoveredCoords, setHoveredCoords] = useState<number[] | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet(768);

  const handleMouseMove = useCallback((e: ymaps.IEvent) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  
    animationFrameId.current = requestAnimationFrame(() => {
      const coords = e.get("coords");
      setHoveredCoords(coords);
    });
  }, []);

  const areCoordsClose = (coords1: number[], coords2: number[]) => {
    const threshold = 0.0018;
    return Math.abs(coords1[0] - coords2[0]) < threshold && Math.abs(coords1[1] - coords2[1]) < threshold;
  };

  useEffect(() => {
    if (!mapRef.current || !ymaps) return;

    ymaps.ready(() => {
      if (!mapRef.current) return;
      const map = mapRef.current;
      //дизейблим скролл и перетаскивание карты на мобильных устройствах
      if (isMobile || isTablet) {
        map.behaviors.disable(['scrollZoom', 'drag']);
      } else {
        map.behaviors.disable('scrollZoom');

      }

      if(mapPoi) {
        //если точки интереса переданы как пропсы, то не ищем на карте
        setPoi(mapPoi)
      } else {
        try {
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
        } catch(err) {
          console.error('MAPS-ERR->', err);
        }
      }
    });
  }, [mapRef.current]);

  useEffect(() => {
    if (mapRef.current && zoom) {
      const newZoom = Math.max(2, Math.min(19, mapZoom ));
      setZoom(newZoom);
      mapRef.current.setZoom(newZoom, { duration: 200 });
    }
  }, [mapZoom]) 

  return (
    <Map
        defaultState={{center: [59.999685, 29.746311], zoom: 14, controls: []}}
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
        onMouseMove={handleMouseMove}
        className={styles[`${wrapperClass}`]}
    >
      <Clusterer 
        options={{
          clusterIcons: [
            {
              href: "", // Оставляем пустым, чтобы использовать кастомный layout
              size: [40, 40],
              offset: [-20, -20],
            },
          ],
          groupByCoordinates: false, // Группировать точки с одинаковыми координатами
          clusterDisableClickZoom: false, // Разрешить зум на кластере
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false,
          clusterIconContentLayout: (ymapsFactory && ymapsFactory.templateLayoutFactory && ymapsFactory.templateLayoutFactory.createClass(
            '<div style="background: white; color: black; ' +
            'border-radius: 50%; width: 60px; height: 60px; ' +
            'display: flex; align-items: center; justify-content: center; ' +
            'border: 4px solid #277B97; font-size: 14px; font-weight: bold;">' +
            '{{ properties.geoObjects.length }}' +
            '</div>'
          )),
        }}
      >
        {showLegend && poi && poi.map((place, index) => {
            // return <Placemark
            // key={place.name + index}
            // geometry={place.coords}
            // properties={{ hintContent: place.name, balloonContentBody: place.name }}
            // modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            // options={{
            //   iconLayout: "default#image",
            //   iconImageHref: `/map/icons/${place.icon}`,
            //   iconImageSize: /кронфорт/gi.test(place.name) ? [60, 60] : [40, 40],
            // }}
            return <CustomPlacemark
              key={index}
              coordinates={place.coords}
              hintText={place.name}
              size={/кронфорт/gi.test(place.name) ? 60 : 40}
              iconUrl={place.icon}
              factory={ymapsFactory}
              foreignHover={hoveredCoords && areCoordsClose(hoveredCoords, place.coords) || false}
            />
        })}
      </Clusterer>
      { mapKFPoi && mapKFPoi.map((place, index) => {
            return <CustomPlacemark
              key={index}
              coordinates={place.coords}
              hintText={place.name}
              size={/кронфорт/gi.test(place.name) ? 60 : 40}
              iconUrl={place.icon}
              factory={ymapsFactory}
              foreignHover={hoveredCoords && areCoordsClose(hoveredCoords, place.coords) || false}
          />
        })}
        {customRoutes && customRoutes.map((route, index) => (
          <>
            <GeoObject
              key={route.hint}
              properties={{hintContent: route.hint}}
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
    </Map>
  );
};

interface ITransportMap {
  customPoi?: any[],
  customRoutes?: any[],
  withLegend?: boolean,
  withSidebar?: boolean,
  wrapperClass?: string
}

const TransportMap: FC<ITransportMap> = ({customPoi, customRoutes, withLegend, withSidebar, wrapperClass}) => {
  const [showLegend, setShowLegend] = useState(withLegend || false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [modalView, setModalView] = useState(false);
  const [propZoom, setPropZoom] = useState(14);
  
  
  
  const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   setShowSidebar(!showSidebar)
  }

  const handleExpandMap = () => {
    setModalView(true)
  }

  return (
    <div className={`${styles.trmap_container} ${wrapperClass}`}>
        <YMaps query={{lang: "ru_RU", apikey: "f4f9faf3-0ce8-4dd2-9b67-7843cfeff30f"}}>
            <MapWithClusters 
              mapPoi={customPoi} 
              mapKFPoi={mapKFPoi} 
              showLegend={showLegend}
              customRoutes={customRoutes || []}
              mapZoom={propZoom}
              wrapperClass='trmap_map'
            />
            {/* Кастомные zoom кнопки */}
            <div className={`${styles.zoom_controls} ${showSidebar ? styles.zoom_controls_expand : ''}`}>
              <button className={styles.zoom_btn} onClick={() => setPropZoom(propZoom + 1)}>+</button>
              <button className={styles.zoom_btn} onClick={() => setPropZoom(propZoom - 1)}>−</button>
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
