import styles from './Information.module.scss'
import DownloadButton from '@src/components/UI-kit/BaseControls/buttons/old/downloadButton'

const Information = () => {
  return (
    <section className={styles['comfort-wrapper']}>
      <div className={styles['info-wrapper']}>
        <div className={styles['info']}>
          <div className={styles['title']}>Новые дороги для комфортного будущего</div>

          <div className={styles['table-desc-wrapper']}>
            <p className={styles['description']}>
              Проект «Кронфорт» — часть туристско - рекреационного кластера «Остров фортов», реализация которого
              предусматривает строительство новых дорог, расширение и реконструкцию существующих магистралей Кронштадта.
              Их ввод в эксплуатацию создаст условия для комфортного движения автотранспорта в городе на ближайшие
              два-три десятилетия.
            </p>
          </div>
        </div>

        <div className={styles['download-wrapper']}>
          <DownloadButton />
        </div>
      </div>

      <div className={styles['desc-wrapper']}>
        <p className={styles['description']}>
          Проект «Кронфорт» — часть туристско - рекреационного кластера «Остров фортов», реализация которого
          предусматривает строительство новых дорог, расширение и реконструкцию существующих магистралей Кронштадта. Их
          ввод в эксплуатацию создаст условия для комфортного движения автотранспорта в городе на ближайшие два-три
          десятилетия.
        </p>
      </div>
    </section>
  )
}

export default Information
