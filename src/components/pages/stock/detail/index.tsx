'use client'

import {Title} from '@src/components/UI-kit/TextKit/title/title'
import {HeadTitle} from '@src/components/UI-kit/TextKit/head-title'
import './index.scss'
import FilledButton from '@shared/filledButton/FilledButton'
import BorderedButton from '@shared/borderedButton/BorderedButton'
import {RequestBackCallDrawer} from '@shared/request-back-call-drawer'
import {useState} from 'react'

import TgPrimaryIcon from '@icons/tg-primary.svg'
import WhatsAppPrimaryIcon from '@icons/whatsapp-primary.svg'
import VkPrimaryIcon from '@icons/vk-primary.svg'

const breadcrumbItems = [
  {title: 'Главная', href: '/'},
  {
    title: 'Акции',
    href: '/stocks'
  }
]

export const StocksDetail = () => {
  const [backCallShown, setBackCallShown] = useState(false)

  const handleBackCallShow = () => {
    setBackCallShown(true)
  }

  const handleBackCallClose = () => {
    setBackCallShown(false)
  }

  return (
    <div className='stocks-detail page-container page-container--min'>
      <Title
        breadcrumbs={[
          ...breadcrumbItems,
          {
            title: 'Рассрочка на все готовое!'
          }
        ]}
        style={{position: 'relative', margin: 0}}
      />
      <HeadTitle className='stocks-detail__title'>Рассрочка на все готовое!</HeadTitle>

      <div className='stocks-detail__tag'>Бессрочная акция</div>

      <div className='stocks-detail__plate'>
        <div className='stocks-detail__content-wrapper'>
          <div className='stocks-detail__content'>
            <p>
              Мы позаботились о том, чтобы вам не пришлось ждать выгодных ипотечных условий. С новой программой
              рассрочки от «Главстрой Санкт-Петербург» можно получить ключи от квартиры сразу после внесения
              первоначального взноса. Успейте воспользоваться беспрецедентно комфортной программой рассрочки.
            </p>
            <br />
            <br />
            <p>Как это работает:</p>
            <ol>
              <li>ежемесячные платежи от 35 до 65 тыс. рублей в зависимости от типа квартиры;</li>
              <li>первоначальный взнос не менее 20%;</li>
              <li>еще 30% от стоимости договора необходимо внести через год, остаток — в течение двух лет;</li>
              <li>без удорожания и дополнительных платежей.</li>
            </ol>
            <br />
            <strong>Кому подойдет программа?</strong>
            <p>
              Тем, кто снимает жилье, но мечтает о собственной квартире, а также всем, кто планирует продать имеющуюся
              недвижимость в ближайшее время. У нас останется время, чтобы провести сделку на выгодных условиях.
            </p>
            <p>
              С нашей рассрочкой ключи от новой квартиры в экорайоне «Юнтолово» можно получить сразу после первого
              платежа! Рядом с вашим домом уже все готово для жизни, работы и отдыха: более 50 магазинов, кафе, пекарен,
              салонов красоты, детских центров, пространства для досуга, прогулок, игр и занятия спортом, а еще 2 школы
              и 3 детских сада.
            </p>
            <p>
              Количество квартир ограничено! Забронировать понравившийся вариант или подробней узнать об условиях
              программы, вы сможете на нашем сайте или по телефону: +7 (812) 210-74-87. Наши менеджеры проконсультируют
              вам и помогут с оформлением рассрочки.
            </p>
          </div>
          <div className='stocks-detail__button-group'>
            <BorderedButton className='stocks-detail__back'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M20 12H4' stroke='#747679' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path
                  d='M10 18L4 12L10 6'
                  stroke='#747679'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>Вернуться</span>
            </BorderedButton>
            <FilledButton className='stocks-detail__backcall' variety='secondary' type='submit'>
              выбрать квартиру
            </FilledButton>
          </div>
        </div>

        <div className='stocks-detail__footer'>
          <div className='stocks-detail__footer-socials'>
            <div className='stocks-detail__footer-socials__list'>
              <a href={'/'} target={'_blank'} rel='noreferrer'>
                <TgPrimaryIcon />
              </a>
              <a href={'/'} target={'_blank'} rel='noreferrer'>
                <WhatsAppPrimaryIcon />
              </a>
              <a href={'/'} target={'_blank'} rel='noreferrer'>
                <VkPrimaryIcon />
              </a>
            </div>

            <p className='stocks-detail__footer-socials__caption'>Поделиться</p>
          </div>
          <div className='stocks-detail__footer-backcall'>
            <p className='stocks-detail__footer-backcall__caption'>Есть вопросы? Пишите!</p>
            <FilledButton
              className='stocks-detail__footer-backcall__button'
              variety='primary'
              type='submit'
              onClick={handleBackCallShow}
            >
              заказать звонок
            </FilledButton>
          </div>
        </div>
      </div>

      <RequestBackCallDrawer shown={backCallShown} onClose={handleBackCallClose} />
    </div>
  )
}
