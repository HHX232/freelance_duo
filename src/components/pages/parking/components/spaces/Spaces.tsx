import styles from './spaces.module.scss'
import FilledButton from '@shared/filledButton/FilledButton'

const Spaces = () => {
  return (
    <div className={styles['block-wrapper']}>
      <div className={styles['title']}>Парковочные места</div>
      <div className={`${styles['tiles-wrapper']} ${styles['tiles-main-wrapper']}`}>
        <div className={`${styles['tiles-wrapper']} ${styles['column']}`}>
          <div className={styles['tiles-wrapper']}>
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
              <div className={`${styles['title_text']}`}>Инфраструктура</div>
              <div className={`${styles['desc']}`}>для установки зарядных станций электромобилей.</div>
            </div>
            <div className={`${styles['button_wrapper']}`}>
              <FilledButton style={{height: 'fit-content'}}>Подобрать Парковку</FilledButton>
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
