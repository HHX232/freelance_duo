import styles from '@pages/storerooms/components/head/Head.module.scss'
import {Title} from '@shared/title/title'

const Head = () => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/map'},
    {
      title: 'Паркинг',
      href: '/parking'
    }
  ]

  return (
    <div>
      <section className={styles['head-wrapper']}>
        <div>
          <Title breadcrumbs={breadcrumbItems} dashboard={true} darkTheme={true} />
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Паркинг</h1>
          <p className={styles.description}>
            Современный паркинг с прямым доступом из жилых секций обеспечивает удобство и безопасность в ежедневной
            эксплуатации.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Head
