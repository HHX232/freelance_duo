'use client'
import styles from './favorites.module.scss'
import {breadcrumbItems} from './config/breadcrumbs'
import {Col, ConfigProvider, Row, Tabs} from 'antd'
import Card from '@shared/Cards/card/Card'
import {tabs} from '@src/components/UI-kit/BaseControls/old/tabs/tabs'
import {IObj} from '@src/types/object.interface'
import {NoObjects} from '@shared/no-objects/no-objects'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import {useEffect, useState} from 'react'
import {getFlatsById} from '@src/actions/flats'
import {useStore} from '@src/lib/store/store'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import Link from 'next/link'

export const Favorites = ({dashboard}: {dashboard?: boolean}) => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<IObj[]>([])
  const favorites = useStore((state) => state.favorites)

  const fetchData = async (ids: string[]) => {
    const res = await getFlatsById(ids)
    if (res) {
      setData(res)
    }
    setLoading(false)
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData(favorites)
    }
    fetchInitialData().catch(console.error)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const favoriteSet = new Set(favorites)
      setData((currentData) => currentData.filter((item) => favoriteSet.has(item.id)))
    }
  }, [favorites])

  if (isLoading) {
    return (
      <MainContainer>
        <Title title='Избранное' breadcrumbs={breadcrumbItems} dashboard={true} />
        <NoObjects>
          <p>Загрузка...</p>
        </NoObjects>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <Title title='Избранное' breadcrumbs={breadcrumbItems} dashboard={true} />
      <>
        {!data.length ? (
          <NoObjects>
            <p>Вы пока ничего не добавили в избранное</p>
            <Link href={'/planirovki-i-ceny'}>
              <FilledButton style={{maxWidth: '284px'}}>Добавить квартиру</FilledButton>
            </Link>
          </NoObjects>
        ) : (
          <>
            <div className={styles.favorites}>
              <Row style={{width: '100%'}} gutter={[40, 40]} justify='center'>
                <Col className={styles.grid}>
                  <ConfigProvider theme={{token: {colorPrimary: dashboard ? '#D38F6D' : '#D38F6D'}}}>
                    <Tabs defaultActiveKey='1' items={tabs} onChange={(value: string) => console.log(value)} />
                  </ConfigProvider>
                  <Row gutter={[40, 40]} justify='start'>
                    {data.map((item: IObj) => (
                      <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                        <Card data={item} dashboard={true} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </>
        )}
      </>
    </MainContainer>
  )
}

export default Favorites
