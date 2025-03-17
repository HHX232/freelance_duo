"use client"
import styles from './TransportWrapper.module.scss'
import Head from '@pages/transport/components/head/Head'
import Information from '@pages/transport/components/information/Information'
import TransportMap from '@src/components/UI-kit/transportMap/transportMap'
import Infoblock from '@pages/transport/components/infoblock/Infoblock'
import Blocks from '@pages/transport/components/blocks/Blocks'
import Subscription from '@pages/transport/components/subscription/Subscription'
import TransportModal from '@pages/transport/popup/transportModal'
import { useState } from 'react'

const TransportWrapper = () => {
  const [modalView, setModalView] = useState(0);

  const mapPoi = [
    { coords: [60.008737, 29.722807], name: "Школа №418", icon: 'school_icon.svg' },
    { coords: [60.001739, 29.736115], name: "Фитнесс - центр Кронштадт", icon: 'sport_icon.svg' },
    { coords: [59.995228, 29.738593], name: "Детский сад", icon: 'kindergarden_icon.svg' },
    { coords: [59.994020, 29.748576], name: "Школа", icon: 'school_icon.svg' },
    { coords: [59.998730, 29.758308], name: "Ресторан", icon: 'restorant_icon.svg' },
    { coords: [59.996172, 29.757292], name: "Детская поликлинника", icon: 'medicine_icon.svg' },
    { coords: [59.989298, 29.763328], name: "Парк", icon: 'park_icon.svg' },
    { coords: [59.999664, 29.746338], name: "Кронфорт", icon: 'kf_orange_icon.svg' },
    { coords: [59.994099, 29.755499], name: "Кронфорт", icon: 'kf_red_icon.svg' },
    { coords: [60.001163, 29.737410], name: "Кронфорт набережная", icon: 'kf_green_icon.svg' }
  ]

  return (
    <div className={styles['wrapper']}>
      <Head />
      <Information />
      <div className={styles.transport_content}>
        <TransportMap customPoi={mapPoi} withLegend withSidebar />
        <Infoblock />
        <Blocks setShowModal={setModalView}/>
        <Subscription />
      </div>
      <TransportModal shown={modalView} onClose={() => setModalView(0)} scrollPage={(page) => setModalView(page)}/>
    </div>
  )
}

export default TransportWrapper
