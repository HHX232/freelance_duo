import styles from './comfort.module.scss'
import DownloadButton from '@src/components/UI-kit/BaseControls/buttons/old/downloadButton'

const Comfort = () => {
  return (
    <section className={styles['comfort-wrapper']}>
      <div className={styles['info-wrapper']}>
        <div className={styles['info']}>
          <div className={styles['title']}>Комфорт и безопасность на высшем уровне</div>

          <div className={styles['table-desc-wrapper']}>
            <p className={styles['description']}>
              В каждом корпусе пре дусмотрен подземный паркинг для автомобилей и мотоциклов с доступом из лифтов жилой
              части дома. Также здесь будет размещена велопарковка.
            </p>
            <br />
            <p className={styles['description']}>
              Проведена подготовка под установку зарядных станций для электромобилей. В подземной части каждого корпуса
              для жильцов будут доступны индивидуальные кладовые различных размеров.
            </p>
          </div>
        </div>

        <div className={styles['download-wrapper']}>
          <DownloadButton />
        </div>
      </div>

      <div className={styles['desc-wrapper']}>
        <p className={styles['description']}>
          В каждом корпусе пре дусмотрен подземный паркинг для автомобилей и мотоциклов с доступом из лифтов жилой части
          дома. Также здесь будет размещена велопарковка.
        </p>
        <br />
        <p className={styles['description']}>
          Проведена подготовка под установку зарядных станций для электромобилей. В подземной части каждого корпуса для
          жильцов будут доступны индивидуальные кладовые различных размеров.
        </p>
      </div>
    </section>
  )
}

export default Comfort
