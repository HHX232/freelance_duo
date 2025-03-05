'use client'
import styles from './Head.module.scss'
import SaleBlock from '@shared/SaleBlock/SaleBlock'
import SalePIcon from '@icon/SaleP.svg'
import Breadcrumbs from '@shared/Breadcrumbs/Breadcrumbs'
import {useIsSm} from '@utils/useIsMobile'

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
          title: 'Паркинг',
          href: '/parking'
        }
      ]

  const isSale = true

  return (
    <div>
      <section className={styles['head-wrapper']}>
        <div className={styles.routerWrapper}>
          {/*<Title breadcrumbs={breadcrumbItems} dashboard={true} darkTheme={true} />*/}
          <Breadcrumbs items={breadcrumbItems} darkTheme={true} className={styles['router']} isIconBack={isMobile} />
        </div>
        <div className={styles.container}>
          <div className={styles.title_wrap}>
            <div className={styles.head_title}>Паркинг</div>
            <p className={styles.description}>
              Современный паркинг с прямым доступом из жилых секций обеспечивает удобство и безопасность в ежедневной
              эксплуатации.
            </p>
          </div>
          {isSale && (
            <SaleBlock
              title={
                <div className={styles.sale_title}>
                  <div className={styles.sale_title_text}>скидка 10% </div>
                </div>
              }
              description={<div className={styles.sale_desc}>На парковку до 27 сентабря 2025</div>}
              icon={<SalePIcon className={styles.icon} />}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Head
