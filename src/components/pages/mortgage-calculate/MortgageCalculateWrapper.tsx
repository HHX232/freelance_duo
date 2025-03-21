'use client'
import styles from './MortgageCalculateWrapper.module.scss'
import {useState} from 'react'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import {useIsMaxWidth} from '@utils/useIsMobile'
import StarIcon from '@icons/white_star.svg'
import {RequestBackCallDrawer} from '@shared/Popups/request-back-call-drawer'
import {InputField} from '@src/components/UI-kit/BaseControls/inputs/input-field/input-field'
import InputRangeUI from '@src/components/UI-kit/BaseControls/inputs/RangeInputUI/RangeInputUI'

const PercantTypes = {
  base: 5.5,
  family: 3.5
}

const MortgageCalculateWrapper = () => {
  const [percent, setPercent] = useState<number>(PercantTypes.base)
  const [cost, setCost] = useState('4 000 000')
  const [downPayment, setDownPayment] = useState('2 000 000')
  const [time, setTime] = useState<string>('10')
  const isSx = useIsMaxWidth(320)

  const addSpace = (num: number | string) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const removeNonNumeric = (num: number | string) => num.toString().replace(/[^0-9]/g, "");

  const addSymbol = (value: string) =>
    value
      .split('')
      .filter((val) => val !== '₽')
      .join('')

  const [shownRequestCallBack, setShownRequestCallBack] = useState(false)
  const handleRequestCallBackDrawerClose = () => {
    setShownRequestCallBack(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.title}>Посчитайте вашу выгоду</div>
        <div className={styles.mainContent}>
          <div className={styles.dataInputOuter}>
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
                buttonText={`Семейная от 3,5%`}
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
                onChange={(e) => setCost(addSymbol(addSpace(removeNonNumeric(e.target.value))))}
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
                onChange={(e) => setDownPayment(addSymbol(addSpace(removeNonNumeric(e.target.value))))}
              />

              <InputRangeUI
                labelText={'Срок кредита'}
                placeholder={'введите срок кредите'}
                value={Number(time)}
                min={1}
                max={100}
                extraClass={styles.rangeInput}
                theme={'dark'}
                icon={true}
                isNeedToClear={false}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.conditions}>
            <StarIcon className={styles.star} />
            <div className={styles.subTitle}>
              Базовая ипотека
              <div className={styles.showPercentWrapper}>
                от
                <span>{percent}%</span>
              </div>
            </div>

            <div className={styles.infoWrapper}>
              <div className={styles.lineWrapper}>
                <div className={`${styles.infoBlock} ${styles.selected}`}>
                  <div className={styles.sum}>14 900 ₽</div>
                  <div className={styles.infoText}>Ежемесячный платеж</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>2 094 168 ₽</div>
                  <div className={styles.infoText}>Переплата по кредиту</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>49 951 ₽</div>
                  <div className={styles.infoText}>Рекомендуемый доход</div>
                </div>
              </div>

              <div className={styles.lineWrapper}>
                <div className={styles.infoBlock}>
                  <div className={styles.sum}>1 500 000 ₽</div>
                  <div className={styles.infoText}>Сумма {isSx && <br />}кредита</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>3 594 168 ₽</div>
                  <div className={styles.infoText}>Общая {isSx && <br />}выплата</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>532 242 ₽</div>
                  <div className={styles.infoText}>Налоговый {isSx && <br />}вычет</div>
                </div>
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
              onClick={() => setShownRequestCallBack(true)}
            />
          </div>
        </div>
      </div>

      <RequestBackCallDrawer shown={shownRequestCallBack} onClose={handleRequestCallBackDrawerClose} />
    </div>
  )
}

export default MortgageCalculateWrapper
