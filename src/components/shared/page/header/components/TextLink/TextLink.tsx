import Link from 'next/link'
import styles from './TextLink.module.scss'
import {ITextLinkProps} from './TextLink.types'

export default function TextLink({href, title, style, onClick}: ITextLinkProps) {
  return (
    <div onClick={onClick} className={styles.link} style={style}>
      <Link href={href}>{title}</Link>
    </div>
  )
}
