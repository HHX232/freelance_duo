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
import { mapPoi, mapRoutes } from '@src/lib/utils/catalog/mapMockData'

const TransportWrapper = () => {
  const [modalView, setModalView] = useState(0);

  return (
    <div className={`${styles.wrapper} no-scroll`}>
      <Head />
      <Information />
      <div className={styles.transport_content}>
        <TransportMap customPoi={mapPoi} customRoutes={mapRoutes} withLegend withSidebar withExpandBtn/>
        <Infoblock />
        <Blocks setShowModal={setModalView}/>
        <Subscription />
      </div>
      <TransportModal shown={modalView} onClose={() => setModalView(0)} scrollPage={(page) => setModalView(page)}/>
    </div>
  )
}

export default TransportWrapper
