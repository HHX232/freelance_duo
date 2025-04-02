import styles from './SaleBlock.module.scss'
import clsx from 'clsx'

interface Props {
  title: React.ReactNode
  description: React.ReactNode
  icon?: React.ReactNode
  extraClasses?: string
}

const SaleBlock = ({title, description, icon, extraClasses}: Props) => {

  return (
    <div className={clsx(styles['sale_wrapper'], extraClasses)}>
      {icon && <div className={styles.xlIcon}>{icon}</div>}
      <div className={styles.sale_title_wrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}{title}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  )
}

export default SaleBlock
