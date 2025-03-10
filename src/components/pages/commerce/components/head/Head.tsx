"use client"
import {useIsSm} from '@utils/useIsMobile'
import styles from './Head.module.scss'
import Breadcrumbs from '@shared/Breadcrumbs/Breadcrumbs'

const Head = () => {

  const isMobile = useIsSm()
  const breadcrumbItems = isMobile
    ? [
      {
        title: 'Главная',
        href: '/'
      }
    ]
    : [
      {title: 'Главная', href: '/'},
      {
        title: 'Коммерческие помещения',
        href: '/commerce'
      }
    ]

  return (
    <section className={`${styles['head-wrapper']}`}>
      <div>
        <Breadcrumbs items={breadcrumbItems} darkTheme={true} className={styles['router']} isIconBack={isMobile} />
      </div>
      <div className={`${styles['text-wrapper']}`}>
        <div className={styles.title}>Коммерческие <br/> помещения</div>
      </div>
    </section>
  )
}

export default Head
