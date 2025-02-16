import styles from './Preloader.module.scss'
//import LogoIcon from '@icons/logo-preloader.svg'
import LogoIcon from '@icons/logo.svg'
import LogoMobIcon from '@icons/logo.svg'
import clsx from 'clsx'
import {useIsMobile} from '@utils/useIsMobile'
import NextImage from 'next/image'

const Preloader = () => {
  const isMobile = useIsMobile()

  return (
    <div className={clsx(styles.wrapper, isMobile && 'no-scroll')}>
      {/*{isMobile ? <LogoMobIcon className={styles.logoMob} /> : <LogoIcon className={styles.logo} />}*/}
      {isMobile ? <LogoMobIcon className={styles.logoMob} /> : <LogoIcon className={styles.logo} />}

      <div className={styles.loader}>
        <div className={styles.progress}>
          <div className={styles.icon} />
        </div>
        <div className={styles.textWrapper}>
          <p className={clsx(styles.text, styles.textFirst)}>
            Компас — СИМВОЛ бесконечных
            <br />
            путешествий и открытий
          </p>
          <p className={clsx(styles.text, styles.textSecond)}>
            Волна — СИМВОЛ НОВОГО уровнЯ жизни.
            <br />
            Жизни у моря меняющЕГО всё
          </p>
          <p className={clsx(styles.text, styles.textThird)}>Парус — символ начала нового пути</p>
        </div>
      </div>
      <NextImage className={styles.image} src={'/map/preloader.png'} alt='bg sea' layout='fill' priority />
    </div>
  )
}

export default Preloader
