import styles from './mapLegend.module.scss'
import MapPoint from '@shared/mapPoint/mapPoint'
import {FC, ChangeEvent, useState} from 'react'
import SwitchUI from '../../BaseControls/SwitchUI/SwitchUI'

interface IMapLegend {
  switchVisibility: (visible: boolean) => void
}

const MapLegend: FC<IMapLegend> = ({switchVisibility}) => {
  const [isChecked, setIsChecked] = useState(true)
  const [iconSrc, setIconSrc] = useState('/map/icons/legend_icon_black.svg')

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
    switchVisibility(event.target.checked)
  }

  //'coast' | 'kindergarden' | 'mall' | 'medicine' | 'park' | 'restorant' | 'school' | 'sport' | 'store'
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
    <section className={styles['maplegend-wrapper']}>
      <div className={styles['maplegend-container']}>
        <SwitchUI checked={isChecked} onChange={handleSwitch} />
        <p className={styles['maplegend-name']}>Инфраструктура</p>
      </div>
      <img 
        src={iconSrc} 
        alt='info' 
        className={styles['maplegend-info-icon']}
        onMouseEnter={() => setIconSrc('/map/icons/legend_icon.svg')}
        onMouseLeave={() => setIconSrc('/map/icons/legend_icon_black.svg')} />
      {/* <span className={styles['maplegend-info-icon']}>i</span> */}
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
    </section>
  )
}

export default MapLegend
