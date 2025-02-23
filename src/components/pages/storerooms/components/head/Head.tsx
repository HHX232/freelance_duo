import styles from '@pages/storerooms/components/head/Head.module.scss'
import {Title} from '@shared/title/title'

const Head = () => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/map'},
    {
      title: 'Кладовые',
      href: '/storerooms'
    }
  ]

  return (
    <div>
      <section className={styles['head-wrapper']}>
        <div>
          <Title breadcrumbs={breadcrumbItems} dashboard={true} darkTheme={true} />
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Кладовые</h1>
          <p className={styles.description}>
            Современные помещения для хранения личных вещей с круглосуточным доступом и высоким уровнем безопасности.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Head
