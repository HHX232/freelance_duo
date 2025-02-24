import styles from './ParkingWrapper.module.scss'
import MakeTicket from '@pages/parking/components/MakeTicket/MakeTicket'
import Head from '@pages/parking/components/head/Head'
import Comfort from '@pages/parking/components/comfort/Comfort'
import Scheme from '@pages/parking/components/scheme/Scheme'
import Spaces from '@pages/parking/components/spaces/Spaces'
import Access from '@pages/parking/components/access/Access'

const ParkingWrapper = () => {
  return (
    <div className={styles['wrapper']}>
      <Head />
      <Comfort />
      <div>
        <Access />
        <Scheme />
      </div>
      <Spaces />
      <MakeTicket />
    </div>
  )
}

export default ParkingWrapper
