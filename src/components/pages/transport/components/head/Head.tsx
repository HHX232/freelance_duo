'use client'
import styles from './Head.module.scss'
import Breadcrumbs from '@shared/Breadcrumbs/Breadcrumbs'

const Head = () => {
  const breadcrumbItems = [
        {title: 'Главная', href: '/'},
        {
          title: 'Транспортная доступность',
          href: '/transport'
        }
      ]

  return (
    <div>
      <section className={styles['head-wrapper']}>
        <div className={styles.routerWrapper}>
          {/*<Title breadcrumbs={breadcrumbItems} dashboard={true} darkTheme={true} />*/}
          <Breadcrumbs items={breadcrumbItems} darkTheme={true} className={styles['router']}  />
        </div>
        <div className={styles.container}>
          <div className={styles.title_wrap}>
            <h2 className={styles.head_title}>Транспортная доступность</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Head
