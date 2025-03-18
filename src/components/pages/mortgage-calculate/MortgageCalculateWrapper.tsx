'use client'
import styles from './MortgageCalculateWrapper.module.scss'
import {useState} from 'react'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import {InputField} from '@src/components/UI-kit/inputs/input-field/input-field'

const PercantTypes = {
  base: 5.5,
  family: 3.5
}

const MortgageCalculateWrapper = () => {
  const [percent, setPercent] = useState<number>(PercantTypes.base)
  const [cost, setCost] = useState("4 000 000")
  const [downPayment, setDownPayment] = useState("2 000 000")
  const [time, setTime] = useState<string>("10")

  const addSymbol = (value: string) => value.split("").filter( val => val !== "₽" && val !== " ").join("")

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.title}>Посчитайте вашу выгоду</div>
        <div className={styles.mainContent}>
          <div className={styles.selectorsWrapper}>
            <FullButton
              type={'Button'}
              buttonText={`Базовая от 5.5%`}
              activeButton={true}
              border={false}
              borderColor={''}
              extraClass={styles.button}
              buttonFill={`${percent === PercantTypes.base ? 'blue' : 'white'}`}
              buttonElementColor={`${percent === PercantTypes.base ? 'white' : 'black'}`}
              buttonBorderRadius={'6px'}
              onClick={() => setPercent(PercantTypes.base)}
            />

            <FullButton
              type={'Button'}
              buttonText={`Семейная от 5.5%`}
              activeButton={true}
              border={false}
              borderColor={''}
              extraClass={styles.button}
              buttonFill={`${percent === PercantTypes.family ? 'blue' : 'white'}`}
              buttonElementColor={`${percent === PercantTypes.family ? 'white' : 'black'}`}
              buttonBorderRadius={'6px'}
              onClick={() => setPercent(PercantTypes.family)}
            />
          </div>
          <div className={styles.dataInputWrapper}>
            <InputField
              title={'Стоимость недвижимости'}
              type={'text'}
              placeholder={'Введите стоимость недвижимости'}
              variety={'secondary'}
              value={`${cost} ₽`}
              inputStyles={styles.inputStyles}
              stylesLabel={styles.labelStyles}
              styleContainer={{gridGap: '4px'}}
              onChange={(e) => setCost(addSymbol(e.target.value))}
            />
            <InputField
              title={'Первоначальный взнос'}
              type={'text'}
              placeholder={'Введите первоначальный взнос'}
              variety={'secondary'}
              value={`${downPayment} ₽`}
              inputStyles={styles.inputStyles}
              stylesLabel={styles.labelStyles}
              styleContainer={{gridGap: '4px'}}
              onChange={(e) => setDownPayment(addSymbol(e.target.value))}
            />
            <InputField
              title={'Срок кредита'}
              type={'text'}
              placeholder={'введите срок кредита'}
              variety={'secondary'}
              value={`${time}`}
              inputStyles={styles.inputStyles}
              stylesLabel={styles.labelStyles}
              styleContainer={{gridGap: '4px'}}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className={styles.conditions}>
            <div className={styles.subTitle}>
              Базовая ипотека
              <div className={styles.showPercentWrapper}>
                от
                <span>
                  {percent}%
                </span>
              </div>
            </div>

            <FullButton
              type={'Button'}
              buttonText={`СВЯЗАТЬСЯ С НАМИ`}
              activeButton={true}
              border={false}
              borderColor={''}
              extraClass={styles.button}
              buttonFill={`white`}
              buttonElementColor={`black`}
              buttonBorderRadius={'6px'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MortgageCalculateWrapper
