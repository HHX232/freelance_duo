import Head from '@pages/storerooms/components/head/Head'
import Comfort from '@pages/storerooms/components/comfort/Comfort'
import styles from './StoreRooms.module.scss'
import Tiles from '@pages/storerooms/components/tiles/Tiles'
import Design from '@pages/storerooms/components/design/Design'
import MakeTicket from '@pages/storerooms/components/MakeTicket/MakeTicket'
import Carousel from '@pages/storerooms/components/carousel/carousel'

const StoreRooms = () => {
  return (
    <div className={styles['storerooms-wrapper']}>
      <Head />
      <Comfort />
      <Tiles />
      <Carousel />
      <Design />
      <MakeTicket />
    </div>
  )
}

export default StoreRooms
