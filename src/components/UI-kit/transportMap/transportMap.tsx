'use client'
import styles from './transportMap.module.scss'
import {YMaps, Map, Clusterer, useYMaps} from '@pbe/react-yandex-maps'
import MapLegend from './mapLegend/mapLegend'
import MapSidebar from './mapSidebar/mapSidebar'
import MobilePopup from './mobilePopup/mobilePopup'
import CustomPlacemark from './customPlacemark'
import {FC, useState, useEffect, useRef, useCallback} from 'react'
import {useIsMobile, useIsTablet} from '@utils/useIsMobile'

interface MapWithClustersProps {
  mapPoi?: Array<{ name: string; coords: number[]; icon: string }>;
  showLegend: boolean;
  customRoutes: any[];//Array<{ points: number[][]; arrow: any; color: string; lineWidth: number; hint: string}>;
  customState?: any;
  mapZoom: number;
  wrapperClass?: string;
}

export const MapWithClusters: FC<MapWithClustersProps> = ({ mapPoi, showLegend, customRoutes, customState, mapZoom, wrapperClass }) => {
  const ymapsFactory = useYMaps(["templateLayoutFactory"]); // Дожидаемся загрузки API

  const mapRef = useRef<ymaps.Map | undefined>(undefined)
  const [ymaps, setYmaps] = useState<any | null>(null)
  const [poi, setPoi] = useState<any[]>()
  const [zoom, setZoom] = useState(14);
  const [hoveredCoords, setHoveredCoords] = useState<number[] | null>(null);
  const [calculatedRoutes, setCalculatedRoutes] = useState<any[]>([]);
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
      }
      if (calculatedRoutes.length > 0) {
        calculatedRoutes.forEach(multiRoute => {
          map.geoObjects.add(multiRoute);
        });
        map.setCenter([59.999685, 29.746311]);
        map.setZoom(14);
      }

      return () => {
        if (calculatedRoutes.length > 0) {
          calculatedRoutes.forEach(cRoute => map.geoObjects.remove(cRoute));
        }
      };
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
        defaultState={customState ? customState : {center: [59.999685, 29.746311], zoom: 14, controls: []}}
        options={{ suppressMapOpenBlock: true }}
        controls={[]}
        modules={[
          "control.FullscreenControl",
          "control.SearchControl",
          "control.RoutePanel",
          "multiRouter.MultiRoute"
        ]}
        instanceRef={mapRef}
        onLoad={(ymapsInstance) => {
          setYmaps(ymapsInstance)
          // маршруты
          const multiRoutes = customRoutes.map(route => {
            return new ymapsInstance.multiRouter.MultiRoute(
              {
                referencePoints: [route.points[0], route.points[1]],
                params: {
                  routingMode: "auto",
                }
              },
              {
                routeHintContent: route.hint,
                boundsAutoApply: true,
                routeStrokeWidth: route.lineWidth || 4,
                wayPointStartIconFillColor: route.color,
                wayPointFinishIconFillColor: route.color,
                routeStrokeColor: route.color,
                routeActiveStrokeColor: route.color,
                routeStrokeStyle: "dash",
                routeBoundsAutoApply: false,
                routePreventDragUpdate: true,
                routeActiveRouteAutoSelection: false,
              }
            );
          });
          setCalculatedRoutes(multiRoutes)
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
    </Map>
  );
};

interface ITransportMap {
  customPoi?: any[],
  customRoutes?: any[],
  customState?: any,
  withPoi?: boolean,
  withLegend?: boolean,
  withSidebar?: boolean,
  wrapperClass?: string
}

const TransportMap: FC<ITransportMap> = ({customPoi, customRoutes, customState, withPoi, withLegend, withSidebar, wrapperClass}) => {
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
              showLegend={withPoi ? withPoi : showLegend}
              customRoutes={customRoutes || []}
              customState={customState}
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
