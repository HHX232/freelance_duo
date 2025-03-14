'use client'
import styles from './transportMap.module.scss'
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps'
import { Button } from 'antd'
import {useState} from 'react'

const TransportMap = () => {
  const [showLegend, setShowLegend] = useState(false)

  return (
    <div className={styles.trmap_container}>
        <YMaps>
            <Map
                height={800}
                width={1000}
                defaultState={{center: [59.99494649074784, 30.247901999999492], zoom: 9}}
                className={`${styles.trmap_map} ${showLegend ? styles.trmap_map_small : styles.trmap_map_big}`}
            >
                <Placemark
                geometry={[59.99494649074784, 30.247901999999492]}
                properties={{
                    balloonContentHeader: 'Отдел продаж',
                    balloonContentBody:
                    'ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»',
                    balloonContentFooter: 'По будням: с 9:00 до 19:00\n' + '\n' + 'Выходные: суббота - воскресенье',
                    hintContent: 'Нажмите для подробностей'
                }}
                options={{
                    balloonPanelMaxMapArea: 0, // Отключение автоцентрирования карты при открытии балуна
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                />
            </Map>
            <Button name='>>' onClick={() => setShowLegend(true)}/>
        </YMaps>
    </div>
  )
}

export default TransportMap
