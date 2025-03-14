"use client"
import styles from './TransportWrapper.module.scss'
import Head from '@pages/transport/components/head/Head'
import Information from '@pages/transport/components/information/Information'
// import TransportMap from '@pages/transport/components/transportMap/transportMap'
import Infoblock from '@pages/transport/components/infoblock/Infoblock'
import Blocks from '@pages/transport/components/blocks/Blocks'
import Subscription from '@pages/transport/components/subscription/Subscription'
import TransportModal from '@pages/transport/popup/transportModal'
import { useState } from 'react'

const TransportWrapper = () => {
  const [modalView, setModalView] = useState(0);
  return (
    <div className={styles['wrapper']}>
      <Head />
      <Information />
      {/* <TransportMap /> */}
      <div className={styles.transport_content}>
        <Infoblock />
        <Blocks setShowModal={setModalView}/>
        <Subscription />
      </div>
      <TransportModal shown={modalView} onClose={() => setModalView(0)} scrollPage={(page) => setModalView(page)}/>
    </div>
  )
}

export default TransportWrapper
