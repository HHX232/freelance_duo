import Link from 'next/link'
import styles from './LinkWithIconAndCount.module.scss'
import {ILinkWithIconAndCountProps} from './LinkWithIconAndCount.types'
import Badge from '@src/components/UI-kit/Indicators/Badge/badge'

export default function LinkWithIconAndCount(props: ILinkWithIconAndCountProps, {...rest}) {
  return (
    <div {...rest} style={props.style} className={styles.link}>
      <Link href={props.href}>
        <div className={styles.icon}>{props.children}</div>
        <Badge extraClassName={styles.badge} value={props.count} />
      </Link>
    </div>
  )
}
