'use client'

import styles from '@pages/storerooms/components/head/Head.module.scss'
import {useIsSm} from '@utils/useIsMobile'
import Breadcrumbs from '@shared/Breadcrumbs/Breadcrumbs'

const Head = () => {
  const isMobile = useIsSm()
  const breadcrumbItems = isMobile
    ? [
      {
        title: 'Главная',
        href: '/map',
      }
    ]
    : [
      {title: 'Главная', href: '/map'},
      {
        title: 'Кладовые',
        href: '/storerooms'
      }
    ]

  return (
    <div>
      <section className={`${styles['head-wrapper']}`}>
        <div>
          <Breadcrumbs items={breadcrumbItems} darkTheme={true} className={styles['router']} isIconBack={isMobile} />
        </div>
        <div className={`${styles['text-wrapper']}`}>
          <div className={styles.title}>Кладовые</div>
          <div className={styles.description}>
            Современные помещения для хранения личных вещей с круглосуточным доступом и высоким уровнем безопасности.
          </div>
        </div>
      </section>
    </div>
  )
}

export default Head
