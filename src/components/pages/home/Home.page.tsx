import styles from './Home.module.scss'
import FilledButton from '@shared/filledButton/FilledButton'
import MenuPoint from '@icons/Menu point.svg'
import useRouterNext from '@src/lib/hooks/useRouter'

const HomePage = () => {
  const {replace} = useRouterNext()

  return (
    <div>
      <section className={styles['home-wrapper']}>
        <div className={styles['text_wrapper']}>
          <div className={styles.title}>Кронфорт</div>
          <p className={styles.description}>
            Море меняет все, Море здесь – главная доминанта, наполняющая энергией все пространство вокруг.
          </p>
        </div>
        <div className={styles['button_wrapper']}>
          <FilledButton
            onClick={() => {
              replace({
                pathname: '/planirovki-i-ceny',
                query: {}
              })
            }}
          >
            <MenuPoint className={styles['icon']} />
            Подобрать квартиру
          </FilledButton>
        </div>
      </section>
    </div>
  )
}

export default HomePage
