import styles from './Home.module.scss';

const HomePage = () => {
  return <div>
    <section className={styles['home-wrapper']}>
      <div className={styles.container}>
        <h1 className={styles.title}>Кронфорт</h1>
        <p className={styles.description}>Море меняет все, Море здесь – главная доминанта, наполняющая энергией все пространство вокруг.</p>
      </div>
    </section>
  </div>
}

export default HomePage
