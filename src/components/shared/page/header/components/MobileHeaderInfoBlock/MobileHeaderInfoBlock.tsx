import styles from './MobileHeaderInfoBlock.module.scss'
import Inst from '@icons/inst.svg'
import Vk from '@icons/vk.svg'
import TelLink from '@src/components/UI-kit/Text-Elements/TelLink/TelLink'

export default function MobileHeaderInfoBlock() {
  return (
    <div className={styles.mobile_text_box}>
      <p className={styles.mobile_text_title}>Головной офис продаж</p>
      <div className={styles.mobile_inner_text}>
        <TelLink typeDecorNumber={'classic'} />
        <p className={styles.mobile_text_adress}>
          ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»
        </p>
        <div className={styles.time_block}>
          <p className={styles.time_block_text}>По будням: с 9:00 до 19:00</p>
          <p className={styles.time_block_text}>Выходные: суббота - воскресенье</p>
        </div>
        <div className={styles.social_box}>
          <a href={'/'} target='_blank' rel='noreferrer'>
            <Vk className={styles.vk}></Vk>
          </a>
          <a href={'/'} target='_blank' rel='noreferrer'>
            <Inst className={styles.inst}></Inst>
          </a>
          <p className={styles.social_box_text}>— Мы в соц сетях</p>
        </div>
      </div>
    </div>
  )
}
