import styles from './mini-card.module.scss'
import CompareIcon from '@icons/compare_icon.svg'
import FavoriteIcon from '@icons/bookmark_icon.svg'
import {useStore} from '@src/lib/store/store'
import NextImage from 'next/image'
import Link from 'next/link'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import {sendTmrEvent} from '@utils/tmrTracker'
export const MiniCard = ({
  id,
  name,
  price,
  image,
  floor,
  ready
}: {
  id: string
  name: string
  price: string
  image: string
  floor: string
  ready: string
}) => {
  const {addToFavorites, addToCompare, favorites, compare} = useStore()

  const isFavorite = favorites.includes(id)
  const isCompare = compare.includes(id)

  return (
    <div className={styles.mini_card}>
      <Link href={`/apartment-card/${id}`}>
        <div className={styles.actions}>
          <button
            type='button'
            className={styles.action}
            onClick={(e) => {
              e.preventDefault()
              addToCompare(id)
              sendTmrEvent('compare', id, price)
            }}
          >
            <CompareIcon style={{fill: isCompare ? '#D38F6D' : ''}} />
          </button>
          <button
            type='button'
            className={styles.action}
            onClick={(e) => {
              e.preventDefault()
              addToFavorites(id)
              sendTmrEvent('like', id, price)
            }}
          >
            <FavoriteIcon style={{fill: isFavorite ? '#D38F6D' : ''}} />
          </button>
        </div>
        <div className={styles.img}>
          <NextImage
            src={image}
            alt={name}
            height={124}
            width={159}
            style={{objectFit: 'contain', objectPosition: 'center'}}
          />
        </div>
        <div className={styles.name}>
          <p>{name}</p>

          <ul className={styles.detail}>
            <li className={styles.listItem}>
              Корпус <span>2</span>
            </li>
            <li className={styles.listItem}>
              Этаж <span>{floor}</span>
            </li>
            <li className={styles.listItem}>
              Cдача <span>{ready}</span>
            </li>
          </ul>

          <div className={styles.line} />
          <p>{new Intl.NumberFormat('ru').format(+price)} руб. </p>
        </div>
        <div className={styles.buttonWrap}>
          <Link href={`/apartment-card/${id}`}>
            <FilledButton variety='primary'>Забронировать</FilledButton>
          </Link>
        </div>
      </Link>
    </div>
  )
}
