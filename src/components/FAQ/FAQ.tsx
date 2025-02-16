'use client'
import {Collapse, ConfigProvider, Select} from 'antd'
import {useState} from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import {breadcrumbItems, categories} from '@src/components/FAQ/data'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@shared/title/title'
import {LightBorder} from '@shared/light-border/light-border'
import FaqSelect from '@icon/faqSelect.svg'
import CollapseIcon from '@icon/collapse.svg'
export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id)

  const activeQuestions = categories?.find((category) => category.id === activeCategory)?.items || []

  const options = categories.map((category) => ({
    value: category.id,
    label: category.label
  }))
  const [selectedType, setSelectedType] = useState(options[0].value)

  const handleCategoryChange = (selectedOption: string) => {
    setActiveCategory(selectedOption)
    setSelectedType(selectedOption)
  }

  return (
    <MainContainer>
      <Title title='' breadcrumbs={breadcrumbItems} dashboard={true} />
      <section className={styles.faq}>
        <div className={styles.faqWrapper}>
          {/*<Breadcrumbs items={breadcrumbItems} />*/}
          <div className={styles.categories}>
            <p className={styles.title}>Выберите рубрику</p>
            <ConfigProvider theme={{token: {colorPrimary: '#F47422'}}}>
              <Select
                suffixIcon={<FaqSelect />}
                onChange={handleCategoryChange}
                style={{marginBottom: '20px', height: '40px', width: '100%', maxWidth: '456px'}}
                options={options}
                className={styles.select}
                value={selectedType}
              />
            </ConfigProvider>
          </div>
          <div className={styles.categoriesList}>
            {!!categories.length &&
              categories?.map((category) => (
                <button
                  onClick={() => setActiveCategory(category.id)}
                  key={category.id}
                  className={clsx(styles.categoriesItem, {[styles.activeCategory]: category.id === activeCategory})}
                >
                  {category.label}
                </button>
              ))}

            <div className={styles.light}>
              <LightBorder />
            </div>
          </div>
          {!!activeQuestions.length && (
            <div className={styles.faqList}>
              <Collapse
                bordered={false}
                items={activeQuestions}
                defaultActiveKey={['1']}
                expandIconPosition='end'
                expandIcon={({isActive}) => <CollapseIcon rotate={isActive ? 140 : 0} />}
              />
            </div>
          )}
        </div>
      </section>
    </MainContainer>
  )
}
