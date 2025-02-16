'use client'
import styles from './reservation.module.scss'
import {breadcrumbItems} from './config/breadcrumbs'
import {Col, ConfigProvider, Row, Tabs} from 'antd'
import Card from '@shared/card/Card'
import {tabs} from '@shared/tabs/tabs'
import {IObj} from '@src/types/object.interface'
import {NoObjects} from '@shared/no-objects/no-objects'
import FilledButton from '@shared/filledButton/FilledButton'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@shared/title/title'
import Link from 'next/link'
import {useStore} from '@src/lib/store/store'
import {useEffect, useState} from 'react'
import {getFlatsByGuid} from '@src/actions/flats'
import {GetProfile} from '@src/actions/profile'
import {IDeal, ReservationItem} from '@src/types/reservation.interface'

export const Reservation = () => {
  const {token, clearToken} = useStore()

  const [isReservations, setReservations] = useState<ReservationItem | null>(null)
  const [isData, setData] = useState<IObj[]>([])
  const [isLoadingData, setLoadingData] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [isAuthorized, setAuthorized] = useState(true)

  const fetchData = async (ids: string[]) => {
    const res = await getFlatsByGuid(ids)
    if (res) {
      setData(res)
      setLoadingData(false)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GetProfile(token)
        if (res.success) {
          setReservations(res)
          console.log(isReservations)

          const deals = res.user.data.deals
          if (deals && deals.length > 0) {
            await fetchInitialData(deals)
          } else {
            setLoadingData(false)
          }

          setAuthorized(true)
        } else {
          setAuthorized(false)
          clearToken()
        }
      } catch (error) {
        setAuthorized(false)
        clearToken()
      } finally {
        setLoading(false)
      }
    }

    const fetchInitialData = async (deals: IDeal[]) => {
      const objectGuids = deals.map((item: IDeal) => item.objectGuid)
      if (objectGuids.length > 0) {
        await fetchData(objectGuids)
      }
    }

    const initialize = async () => {
      try {
        await fetchProfile()
      } catch (error) {
        console.error(error)
      }
    }

    initialize()
  }, [token])

  if (isLoading) {
    return (
      <MainContainer>
        <Title title='Бронь' breadcrumbs={breadcrumbItems} dashboard={true} />
        <NoObjects>
          <p>Загрузка...</p>
        </NoObjects>
      </MainContainer>
    )
  }

  if (!isAuthorized) {
    return (
      <MainContainer>
        <Title title='Бронь' breadcrumbs={breadcrumbItems} dashboard={true} />
        <NoObjects>
          <p>Вы не авторизованы</p>
        </NoObjects>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <Title title='Бронь' breadcrumbs={breadcrumbItems} dashboard={true} />
      {isData.length > 0 ? (
        <div className={styles.reservation}>
          <Row style={{width: '100%'}} gutter={[40, 40]}>
            <Col className={styles.grid}>
              <ConfigProvider theme={{token: {colorPrimary: '#D38F6D'}}}>
                <Tabs defaultActiveKey='1' items={tabs} onChange={(value: string) => console.log(value)} />
              </ConfigProvider>
              <Row gutter={[40, 40]} justify='start'>
                {isData.map((item: IObj) => (
                  <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Card data={item} dashboard={true} cancel={true} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        <NoObjects>
          {isLoadingData ? (
            <p>Загрузка ...</p>
          ) : (
            <>
              <p>На данный момент у вас нет забронированных объектов</p>
              <Link href={'/planirovki-i-ceny'}>
                <FilledButton style={{maxWidth: '284px'}}>Добавить квартиру</FilledButton>
              </Link>
            </>
          )}
        </NoObjects>
      )}
    </MainContainer>
  )
}
