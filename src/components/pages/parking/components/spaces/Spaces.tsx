import styles from './spaces.module.scss'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

const Spaces = () => {
  return (
    <div className={styles['block-wrapper']}>
      <div className={styles['title']}>Парковочные места</div>
      <div className={`${styles['tiles-wrapper']} ${styles['tiles-main-wrapper']}`}>
        <div className={`${styles['tiles-wrapper']} ${styles['column']}`}>
          <div className={`${styles['tiles-wrapper']} ${styles['num-col-wrapper']}`}>
            <div className={`${styles['tile']} ${styles['bg-1']} ${styles['num_info']}`}>
              <div className={`${styles['title_num']}`}>74</div>
              <div className={`${styles['desc']}`}>парковочных места</div>
            </div>
            <div className={`${styles['tile']} ${styles['bg-2']} ${styles['num_info']}`}>
              <div className={`${styles['title_num']}`}>7</div>
              <div className={`${styles['desc']}`}>адаптированных для маломобильных групп</div>
            </div>
          </div>
          <div className={`${styles['tile']} ${styles['bg-3']}`}>
            <div className={`${styles['text_wrapper']}`}>
              <div className={`${styles['title_text']}`}>места хватит всем</div>
              <div className={`${styles['desc']}`}>Места для автомобилей, мотоциклов и велосипедов</div>
            </div>
            <div className={`${styles['button_wrapper']}`}>
              <FullButton
                type={'Button'}
                buttonText={'Подобрать Парковку'}
                activeButton={true}
                border={false}
                borderColor={''}
                extraClass={styles.button}
                buttonFill='bronze-500'
                buttonElementColor='white'
                buttonBorderRadius={'6px'}
              />
            </div>
          </div>
        </div>
        <div className={`${styles['tile']} ${styles['bg-4']}`}>
          <div className={`${styles['title_text']}`}>Инфраструктура</div>
          <div className={`${styles['desc']}`}>для установки зарядных станций электромобилей.</div>
        </div>
      </div>
    </div>
  )
}

export default Spaces
