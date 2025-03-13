import styles from './TransportWrapper.module.scss'
import Head from '@pages/transport/components/head/Head'
import Information from '@pages/transport/components/information/Information'
import Infoblock from '@pages/transport/components/infoblock/Infoblock'
import Blocks from '@pages/transport/components/blocks/Blocks'
import Subscription from '@pages/transport/components/subscription/Subscription'

const TransportWrapper = () => {
  return (
    <div className={styles['wrapper']}>
      <Head />
      <Information />
      <div className={styles.transport_content}>
        <Infoblock />
        <Blocks />
        <Subscription />
      </div>
    </div>
  )
}

export default TransportWrapper
