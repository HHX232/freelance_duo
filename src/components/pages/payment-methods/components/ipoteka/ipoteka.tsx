import FastForwardSVG from '@icons/fast_forward.svg'
import MonitorSVG from '@icons/monitor.svg'
// import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
// import BorderedButton from '@src/components/UI-kit/BaseControls/buttons/old/borderedButton/BorderedButton'
import ipotekaStyles from './ipoteka.module.scss'
import styles from '../../payment-methods.module.scss'
import clsx from 'clsx'
import {FC} from 'react'
import Image from 'next/image'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'
// import H3Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H3Title'
import H4Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H4Title'

interface IIpotekaTabProps {
  setShownRequestCallBack: (flag: boolean) => void
}

export const IpotekaTab: FC<IIpotekaTabProps> = ({setShownRequestCallBack}) => {
  return (
    <>
      <div className={ipotekaStyles.container}>
        <section className={clsx(styles.poster, ipotekaStyles.wrapper)}>
          <Image
            className={ipotekaStyles.bg}
            alt='ipoteka'
            quality={90}
            fill
            src={'/content/payment-methods/ipoteka.webp'}
          />
          <div className={ipotekaStyles.overflow} />
          <h2 className={styles.posterTitle}>Ипотека</h2>
          <p className={styles.subtitle}>Выгодные условия для вашего дома</p>

          <div className={ipotekaStyles.cards_wrapper}>
            <div className={clsx(styles.cards, ipotekaStyles.cards_list)}>
              <div className={styles.card}>
                <div className={styles['icon-wrapper']}>
                  <FastForwardSVG />
                </div>
                <h3 className={styles['card-title']}>Быстрое оформление и экономия средств</h3>
              </div>
              <div className={styles.card}>
                <div className={styles['icon-wrapper']}>
                  <MonitorSVG />
                </div>
                <h3 className={styles['card-title']}>решение по ипотеке, не выходя из дома</h3>
              </div>
            </div>
          </div>
        </section>
        <div className={styles['poster-meta']}>
          <p className={styles['poster-meta__title']}>Есть вопросы? Свяжитесь с нами!</p>
          {/* <button className={clsx([styles['tab-button']])}>Получить консультацию</button> */}
          <FullButton
            extraClass={styles.button_extra_2}
            activeButton={false}
            buttonBorderRadius='6px'
            buttonFill='white'
            border={false}
            borderColor='none'
            buttonText={'Получить консультацию'}
          />
        </div>
      </div>

      <section className={clsx(styles.variants, ipotekaStyles.variants)}>
        <div className={styles['variant-items']}>
          <div className={styles['variant-row']}>
            <div
              className={clsx(ipotekaStyles.cover, styles.cover)}
              style={{backgroundImage: `url("/content/payment-methods/ipoteka_second.webp")`}}
            />
            <div className={clsx(ipotekaStyles.meta, styles.meta)}>
              <div className={clsx(ipotekaStyles.meta__info, styles.meta__info)}>
                <div className={clsx(styles['meta__info-inner'], ipotekaStyles.info_content)}>
                  <H4Title extraClass={styles.extra_title_4}>
                    Одобрение ипотеки
                    <br />
                    <span>по 2 документам</span>
                    <br /> за 5 минут
                  </H4Title>

                  <ParagraphUI extraClass={styles.paragraph_extra} size={'md'} weight={'regular'}>
                    Бесплатная консультация с кредитным специалистом по номеру
                  </ParagraphUI>
                  <div>
                    {/* <p className={clsx(ipotekaStyles.contacts, styles['meta__info-inner__phone'])}>8 (812) 660–82–71</p> */}
                    <ParagraphUI
                      extraClass={styles.paragraph_extra_lg}
                      extraStyle={{color: '#11627D'}}
                      size={'lg'}
                      weight='regular'
                    >
                      8 (812) 660–82–71
                    </ParagraphUI>
                    {/* <p className={clsx(styles['meta__info-inner__caption'])} style={{color: '#A0A3A8', marginTop: 10}}>
                      ежедневно с 9:00 до 18:00
                    </p> */}
                    <ParagraphUI
                      extraClass={styles.paragraph_extra}
                      extraStyle={{color: '#A0A3A8', marginTop: 10}}
                      size='md'
                      weight='regular'
                    >
                      {' '}
                      ежедневно с 9:00 до 18:00
                    </ParagraphUI>
                  </div>
                </div>
                <div className={clsx(styles['meta-buttons'], ipotekaStyles.controls)}>
                  {/* <FilledButton>
                    <span>Подать заявку онлайн</span>
                  </FilledButton> */}
                  <span style={{width: '100%', zIndex: '7'}}>
                    <FullButton
                      extraClass={styles.button_extra}
                      buttonElementColor='white'
                      buttonText={'Узнать подробнее'}
                      activeButton
                      buttonBorderRadius='6px'
                      buttonFill='bronze-500'
                      border={false}
                      borderColor='none'
                    />
                  </span>
                  {/* <BorderedButton
                    className={styles['meta-buttons__bordered']}
                    onClick={() => setShownRequestCallBack(true)}
                  >
                    <span style={{color: '#555'}}>Связаться с нами</span>
                  </BorderedButton> */}
                  <span style={{width: '100%', zIndex: '7'}}>
                    <FullButton
                      extraClass={styles.button_extra}
                      buttonFill='none'
                      activeButton
                      border={true}
                      borderColor={'gray-dark'}
                      borderWidth='1px'
                      buttonBorderRadius='6px'
                      buttonText={'Подобрать квартиру'}
                      onClick={() => setShownRequestCallBack(true)}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
