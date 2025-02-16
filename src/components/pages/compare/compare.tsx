'use client'
import styles from './compare.module.scss'
import {breadcrumbItems} from './config/breadcrumbs'
import {Col, ConfigProvider, Modal, Row, Tabs} from 'antd'
import {tabs} from '@shared/tabs/tabs'
import {NoObjects} from '@shared/no-objects/no-objects'
import FilledButton from '@shared/filledButton/FilledButton'
import {CompareCheckBox} from '@pages/compare/components/checkbox-compare'
import {useEffect, useState, useCallback} from 'react'
import {CompareCard} from '@pages/compare/components/compare-card'
import {IObj} from '@src/types/object.interface'
import {useStore} from '@src/lib/store/store'
import {getFlatsById} from '@src/actions/flats'
import {Title} from '@shared/title/title'
import {MainContainer} from '@shared/containers/main/main-container'
import Link from 'next/link'
import {GetProfile} from '@src/actions/profile'
import {AuthPopup} from '@pages/dashboard/auth/auth'
import {useRouter} from 'next/navigation'

export const Compare = ({dashboard}: {dashboard?: boolean}) => {
  const [isDifferences, setDifferences] = useState(false)
  const [originalData, setOriginalData] = useState<IObj[]>([])
  const [data, setData] = useState<IObj[]>([])

  const router = useRouter()

  const {token, removeAllCompare} = useStore()
  const [isAuth, setAuthorized] = useState(false)
  const [isReservation, setReservation] = useState(false)
  const [modalAuth, setModalAuth] = useState(false)
  const [modalInfo, setInfoModal] = useState({
    value: false,
    ext_guid: ''
  })
  const [visibleReservation, setVisibleReservation] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GetProfile(token)

        if (res.success) {
          setAuthorized(true)
        } else {
          setAuthorized(false)
        }
      } catch (error) {
        setAuthorized(false)
      }
    }
    setReservation(true)
    fetchProfile()
  }, [token])

  const handleNeedAuth = () => {
    setVisibleReservation(false)
    setModalAuth(true)
  }

  const handleDifferent = (value: boolean) => {
    setDifferences(value)
  }

  // const sortData = useCallback((dataArray: IObj[]) => {
  //   return dataArray.slice().sort((a, b) => {
  //     const aValue = parseFloat(a.Fvalue?.replace(/\s/g, '') || '0')
  //     const bValue = parseFloat(b.Fvalue?.replace(/\s/g, '') || '0')
  //     return aValue - bValue
  //   })
  // }, [])

  const [isLoading, setLoading] = useState(true)
  const compare = useStore((state) => state.compare)

  const fetchData = async (ids: string[]) => {
    const res = await getFlatsById(ids)
    if (res && Array.isArray(res)) {
      setOriginalData(res)
      setData(res)
    } else {
      setOriginalData([])
      setData([])
    }
    setLoading(false)
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData(compare)
    }
    fetchInitialData().catch(console.error)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const compareSet = new Set(compare)
      const filteredData = originalData.filter((item) => compareSet.has(item.id))
      setOriginalData(filteredData)
      setData(filteredData)
    }
  }, [compare, isLoading])

  // useEffect(() => {
  //   if (isDifferences) {
  //     setData(sortData(originalData))
  //   } else {
  //     setData([...originalData])
  //   }
  // }, [isDifferences, originalData, sortData])

  const filterDifferences = useCallback((dataArray: IObj[]) => {
    const keys: (keyof IObj)[] = ['Plandate', 'Fvalue', 'Floor', 'Building']
    const allValues = keys.reduce((acc: Record<string, any[]>, key) => {
      acc[key as string] = dataArray.map((item) => item[key])
      return acc
    }, {})

    const hasDifferences = (key: string) => new Set(allValues[key]).size > 1

    return dataArray.map((item) => {
      const newItem = {...item}
      keys.forEach((key) => {
        if (!hasDifferences(key as string)) {
          delete newItem[key]
        }
      })
      return newItem
    })
  }, [])

  const operations = (
    <div className={styles.filter}>
      <button type='button' onClick={() => removeAllCompare()}>
        <svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1.92747 7.50271L0 5.0009H1.15817V5C1.15817 3.61936 1.70815 2.36936 2.59732 1.46452C3.48649 0.559678 4.71483 -3.6035e-07 6.07156 -3.6035e-07C7.42829 -3.6035e-07 8.65664 0.559678 9.5458 1.46452C9.56444 1.48348 9.5828 1.50253 9.60108 1.52176L8.6892 2.70549C8.6333 2.63949 8.57501 2.57566 8.51451 2.51408C7.88937 1.87793 7.02567 1.48447 6.07156 1.48447C5.11745 1.48447 4.25375 1.87793 3.62862 2.51408C3.00349 3.15023 2.61675 4.02916 2.61675 5.00009V5.00099H3.85486L1.92747 7.50271ZM6.07156 8.51562C5.11745 8.51562 4.25375 8.12216 3.62862 7.48601C3.56829 7.42461 3.51026 7.36105 3.45455 7.29532L2.54267 8.47896C2.56077 8.49792 2.57895 8.51688 2.59732 8.53557C3.48649 9.44032 4.71483 10 6.07156 10C7.42829 10 8.65664 9.44032 9.5458 8.53548C10.4345 7.63109 10.9843 6.382 10.985 5.00235H12.1429L10.2154 2.50054L8.28791 5.00235H9.52628C9.52566 5.97228 9.1391 6.85031 8.51451 7.48601C7.88937 8.12216 7.02567 8.51562 6.07156 8.51562Z'
            fill='#A5B7BF'
          />
        </svg>
        <span>Очистить</span>
      </button>
      <CompareCheckBox onChoose={(value) => handleDifferent(value)} dashboard={dashboard} />
    </div>
  )

  if (isLoading) {
    return (
      <MainContainer>
        <Title title='Сравнение' breadcrumbs={breadcrumbItems} dashboard={true} />
        <NoObjects>
          <p>Загрузка...</p>
        </NoObjects>
      </MainContainer>
    )
  }

  const displayedData = isDifferences ? filterDifferences(data) : data

  const handleInfo = (value: boolean, ext_guid: string) => {
    setInfoModal({value, ext_guid})
  }

  return (
    <MainContainer>
      <Title title='Сравнение' breadcrumbs={breadcrumbItems} dashboard={true} />
      {modalAuth && <AuthPopup onClose={() => setModalAuth(false)} router={true} />}

      <Modal
        open={modalInfo.value}
        footer={null}
        onCancel={() =>
          setInfoModal({
            value: false,
            ext_guid: ''
          })
        }
        width={746}
        centered
      >
        <div className={styles.start}>
          <div className={styles.text}>
            <p>
              Обратите внимание,
              <br />
              что онлайн бронирование платное
              <br />
              <br />
            </p>
            <p>Забронировать квартиру и зафиксировать ее стоимость можно на 3 дня</p>
          </div>

          <FilledButton
            onClick={() => router.push(`/lk/reservation/${modalInfo.ext_guid}`)}
            style={{maxWidth: '271px'}}
          >
            Начать бронирование
          </FilledButton>
        </div>
      </Modal>

      <Modal open={visibleReservation} footer={null} onCancel={() => setVisibleReservation(false)} width={776} centered>
        <div className={styles.reservation}>
          <p className={styles.reservationText}>
            Бронирование доступно только авторизованным пользователям, авторизуйтесь в личном кабинете и продолжите
            бронирование
          </p>
          <p className={styles.subtext}>Обратите внимание, что бронь платная, срок 3 дня после подтверждения.</p>
          <FilledButton className={styles.reservationButton} onClick={handleNeedAuth} variety='primary'>
            Продолжить
          </FilledButton>
        </div>
      </Modal>

      <>
        {!displayedData.length ? (
          <NoObjects>
            <p>Вы пока ничего не добавили в сравнение</p>
            <Link href={'/planirovki-i-ceny'}>
              <FilledButton style={{maxWidth: '284px'}} variety={!dashboard ? 'primary' : 'primary'}>
                Добавить квартиру
              </FilledButton>
            </Link>
          </NoObjects>
        ) : (
          <>
            <div className={styles.compare}>
              <Row style={{width: '100%'}} gutter={[40, 40]} className={styles.compare_row}>
                <Col className={styles.grid}>
                  <ConfigProvider theme={{token: {colorPrimary: dashboard ? '#D38F6D' : '#F47422'}}}>
                    <Tabs
                      tabBarExtraContent={{
                        left: operations
                      }}
                      defaultActiveKey='1'
                      items={tabs}
                      onChange={(value: string) => console.log(value)}
                      className={styles.tab}
                    />
                  </ConfigProvider>

                  <div className={styles.compare_container}>
                    <CompareCard
                      items={displayedData}
                      dashboard={true}
                      handleDifferent={(value) => handleDifferent(value)}
                      isAuth={isAuth}
                      isReservation={isReservation}
                      setVisibleReservation={() => setVisibleReservation(true)}
                      setInfoModal={(value, ext_guid) => handleInfo(value, ext_guid)}
                      isDifferences={isDifferences}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )}
      </>
    </MainContainer>
  )
}
