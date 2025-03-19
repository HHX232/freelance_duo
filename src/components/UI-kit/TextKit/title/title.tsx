import styles from './title.module.scss'
import Breadcrumbs, {BreadcrumbItem} from '@src/components/UI-kit/Navigation/Breadcrumbs/Breadcrumbs'
interface IProps {
  breadcrumbs?: BreadcrumbItem[]
  title?: string
  darkTheme?: boolean
  dashboard?: boolean
  style?: React.CSSProperties
  h1?: boolean
}

export const Title = (props: IProps) => {
  return (
    <div className={styles.title} style={props.style}>
      {props.breadcrumbs && <Breadcrumbs items={props.breadcrumbs} darkTheme={props.darkTheme} />}
      {props.h1 ? (
        <>
          {props.title && (
            <p style={{color: props.darkTheme ? '#FDF1CD' : ''}} className={styles.main_title}>
              {props.title}
            </p>
          )}
        </>
      ) : (
        <>
          {props.title && (
            <h1 style={{color: props.darkTheme ? '#FDF1CD' : ''}} className={styles.main_title}>
              {props.title}
            </h1>
          )}
        </>
      )}
    </div>
  )
}
