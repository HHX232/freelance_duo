'use client'
import styles from './contacts.module.scss'
import {Metadata} from 'next'
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import {useState} from 'react'
import {Backcall} from '@shared/Popups/back-call-popup/backcall'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

const breadcrumbItems = [{title: 'Главная', href: '/'}, {title: 'Контакты'}]

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Контакты',
    description: 'Контакты'
  }
}

const ContactsPage = () => {
  const [callBackModal, setCallBackModal] = useState(false)

  return (
    <MainContainer style={{background: '#11627d'}} customClassName={styles.contact_container}>
      <Title title='Контакты' breadcrumbs={breadcrumbItems} darkTheme />
      <div className={styles.contacts}>
        <div className={styles.contactsContent}>
          <div className={styles.contactsLeft}>
            <div className={styles.contactsPhoneDesk}>
              <p>
                Тел.: <a href={'tel:+7 812 602 20 10'}>+7 812 602 20 10</a>{' '}
              </p>
              <p>Ежедневно с 9:00 до 19:00</p>
            </div>
            <div className={styles.addressDesk}>
              <div className={styles.contactsAddress}>
                <span>Отдел продаж</span>
                <p>ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»</p>
                <p>По будням: с 9:00 до 19:00</p>
                <p>Выходные: суббота - воскресенье</p>
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.contactsMap}>
              <YMaps>
                <Map
                  width={1250}
                  height={924}
                  defaultState={{center: [59.99494649074784, 30.247901999999492], zoom: 9}}
                  className={styles.map}
                >
                  <Placemark
                    geometry={[59.99494649074784, 30.247901999999492]}
                    properties={{
                      balloonContentHeader: 'Отдел продаж',
                      balloonContentBody:
                        'ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»',
                      balloonContentFooter: 'По будням: с 9:00 до 19:00\n' + '\n' + 'Выходные: суббота - воскресенье',
                      hintContent: 'Нажмите для подробностей'
                    }}
                    options={{
                      balloonPanelMaxMapArea: 0, // Отключение автоцентрирования карты при открытии балуна
                      preset: 'islands#icon',
                      iconColor: '#0095b6'
                    }}
                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                  />
                </Map>

                <div className={styles.buttons}>
                  <FullButton
                    borderColor={'none'}
                    buttonFill={'bronze-500'}
                    buttonElementColor={'white'}
                    buttonBorderRadius={'6px'}
                    buttonText={'ОБРАТНЫЙ ЗВОНОК'}
                    extraClass={styles.button}
                    onClick={() => setCallBackModal(!callBackModal)}
                    activeButton={true}
                    border={false}
                  ></FullButton>
                  <FullButton
                    type={'Link'}
                    href={'/feedback'}
                    borderColor={'none'}
                    buttonFill={'white'}
                    buttonElementColor={'black'}
                    buttonBorderRadius={'6px'}
                    buttonText={'СЛУЖБА ДОВЕРИЯ'}
                    extraClass={styles.button}
                    activeButton={true}
                    border={false}
                  ></FullButton>
                </div>
              </YMaps>
            </div>
          </div>
          <div className={styles.addressDeskMobile}>
            <div className={styles.contactsAddress}>
              <span>Отдел продаж</span>
              <p>ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»</p>
              <p>По будням: с 9:00 до 19:00</p>
              <p>Выходные: суббота - воскресенье</p>
            </div>
          </div>
        </div>
      </div>
      {callBackModal && <Backcall onClose={() => setCallBackModal(false)} />}
    </MainContainer>
  )
}

export default ContactsPage
