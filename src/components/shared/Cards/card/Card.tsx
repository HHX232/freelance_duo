'use client'
import styles from './Card.module.scss'
import {formatPrice} from '@src/lib/utils/formatPrice'
import CompareIcon from '@icon/compare_icon.svg'
import BookmarkIcon from '@icon/bookmark_icon.svg'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import {useStore} from '@src/lib/store/store'
import clsx from 'clsx'
import Link from 'next/link'
import NextImage from 'next/image'
import {useState} from 'react'
import {CancellationReservationPopup} from '@shared/Popups/cancellation-reservation-popup/cr-popup'
import SaleIcon from '@icon/ipoteka.svg'
import Sale2Icon from '@icon/sale.svg'
import {useIsTablet} from '@utils/useIsMobile'
import {Tooltip} from 'antd'
import {sendTmrEvent} from '@utils/tmrTracker'

export interface Flat {
  data: {
    id: string
    building_object_id: number
    flat_plan: string
    flat_plan_m: string
    section_plan: string
    floor_plan: string
    Floor: string
    Num: string
    Type: string
    Naxis: string
    Laxis: string
    Tsquare: string
    R1square: string
    Kitchensquare: string
    Toiletsquare: string
    Balconysquare: string
    Lsquare: string
    Fprice: string
    Fvalue: string
    Rvalue: string
    Dvalue: string
    State: string
    numpib: string
    pibtsquare: string
    tipvalue: string
    attributes: string[]
    action: string
    finish: string
    ext_guid: string
    euro: string
    Mvalue: string
    created_at: string
    updated_at: string
    Building: string
    Plandate: string
  }
  dashboard?: boolean
  cancel?: boolean
}

export default function Card(item: Flat) {
  const data = item.data

  const {addToFavorites, addToCompare, favorites, compare} = useStore()

  const isFavorite = favorites.includes(data.id)
  const isCompare = compare.includes(data.id)

  const [isCancel, showCancelModal] = useState(false)

  const isTablet = useIsTablet(768)

  const [isPromo, setPromo] = useState(false)
  const [isSkidka, setSkidka] = useState(false)

  return (
    <article className={clsx(styles.card, item.dashboard && styles.card_dashboard)}>
      <header className={clsx(styles.cardHeader, item.dashboard && styles.dashboard)}>
        <CompareIcon
          onClick={() => {
            addToCompare(data.id)
            sendTmrEvent('compare', data.id, data.Fvalue)
          }}
          style={{fill: item.dashboard ? (isCompare ? '#D38F6D' : '') : isCompare ? '#d38f6d' : ''}}
        />

        <BookmarkIcon
          onClick={() => {
            addToFavorites(data.id)
            sendTmrEvent('like', data.id, data.Fvalue)
          }}
          style={{fill: item.dashboard ? (isFavorite ? '#D38F6D' : '') : isFavorite ? '#d38f6d' : ''}}
        />
      </header>

      <Link href={`/apartment-card/${data.id}`}>
        {/*<Image src={data.flat_plan} alt='map' className={styles.image} />*/}
        <NextImage
          src={data.flat_plan}
          fill
          style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
          className={styles.image}
          alt='Image'
        />
        <h2 className={styles.title}>
          {data.Type} - {data.Tsquare} м2
        </h2>
      </Link>

      <ul className={styles.list}>
        <li className={styles.listItem}>
          Корпус <span>{data.Building}</span>
        </li>
        <li className={styles.listItem}>
          Этаж <span>{data.Floor}</span>
        </li>
        <li className={styles.listItem}>
          Cдача <span>{data.Plandate}</span>
        </li>
      </ul>

      <div className={styles.price_container}>
        <div className={styles.price_block}>
          <span className={styles.price}>{formatPrice(+data.Rvalue)}</span>
          <span className={styles.old_price}>{formatPrice(+data.Mvalue)}</span>
        </div>
        <div className={styles.actions}>
          {isTablet ? (
            <>
              <Tooltip
                align={{
                  offset: [-24, -10] // Смещение по оси X (лево/право)
                }}
                rootClassName='promo_tooltip'
                title='Скидка 15%'
                placement='top'
                zIndex={3}
                color='#11627D'
                onOpenChange={() => setSkidka(!isSkidka)}
                open={isSkidka}
              >
                <button type='button'>
                  <Sale2Icon />
                </button>
              </Tooltip>

              <Tooltip
                align={{
                  offset: [-24, -10] // Смещение по оси X (лево/право)
                }}
                rootClassName='promo_tooltip'
                title='Специальные условия в отделе продаж, только в ноябре'
                placement='top'
                zIndex={3}
                color='#11627D'
                onOpenChange={() => setPromo(!isPromo)}
                open={isPromo}
              >
                <button type='button'>
                  <SaleIcon />
                </button>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip
                align={{
                  offset: [-24, 5] // Смещение по оси X (лево/право)
                }}
                rootClassName='promo_tooltip'
                title='Скидка 15%'
                placement='bottom'
                zIndex={3}
                color='#11627D'
              >
                <button type='button'>
                  <Sale2Icon />
                </button>
              </Tooltip>

              <Tooltip
                align={{
                  offset: [-24, 5] // Смещение по оси X (лево/право)
                }}
                rootClassName='promo_tooltip'
                title='Специальные условия в отделе продаж, только в ноябре'
                placement='bottom'
                zIndex={3}
                color='#11627D'
              >
                <button type='button'>
                  <SaleIcon />
                </button>
              </Tooltip>
            </>
          )}
        </div>
      </div>

      {!item.cancel ? (
        <div className={styles.buttonWrap}>
          <Link href={`/apartment-card/${data.id}`}>
            <FilledButton className={styles.button} variety={!item.dashboard ? 'primary' : 'primary'}>
              Забронировать
            </FilledButton>
          </Link>
        </div>
      ) : (
        <div className={styles.buttonWrap}>
          <FilledButton
            className={styles.button}
            variety={!item.dashboard ? 'primary' : 'primary'}
            onClick={() => showCancelModal(!isCancel)}
          >
            Отменить
          </FilledButton>
        </div>
      )}

      {isCancel && <CancellationReservationPopup onClose={() => showCancelModal(false)} />}
    </article>
  )
}
