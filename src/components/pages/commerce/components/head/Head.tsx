"use client"
import styles from './Head.module.scss'
import Breadcrumbs from '@shared/Breadcrumbs/Breadcrumbs'

const Head = () => {

  const breadcrumbItems = [
      {title: 'Главная', href: '/'},
      {
        title: 'Коммерческие помещения',
        href: '/commerce'
      }
    ]

  return (
    <section className={`${styles['head-wrapper']}`}>
      <div>
        <Breadcrumbs items={breadcrumbItems} darkTheme={true} className={styles['router']} />
      </div>
      <div className={`${styles['text-wrapper']}`}>
        <div className={styles.title}>Коммерческие <br/> помещения</div>
      </div>
    </section>
  )
}

export default Head
