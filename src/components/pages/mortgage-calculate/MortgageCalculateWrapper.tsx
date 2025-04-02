'use client'
import styles from './MortgageCalculateWrapper.module.scss'
import {useRef, useState, useEffect} from 'react'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import {useIsMaxWidth} from '@utils/useIsMobile'
import StarIcon from '@icons/white_star.svg'
import {RequestBackCallDrawer} from '@shared/Popups/request-back-call-drawer'
import {InputField} from '@src/components/UI-kit/BaseControls/inputs/input-field/input-field'
import InputRangeUI from '@src/components/UI-kit/BaseControls/inputs/RangeInputUI/RangeInputUI'
import {TabsUIItem} from '@src/components/UI-kit/BaseControls/TabsUI/TabsUI'

interface CalculationResult {
  monthly_payment: number;
  total_payment: number;
  overpayment: number;
  recommended_income: number;
  loan_amount: number;
  tax_deduction: number;
}

const MortgageCalculateWrapper = () => {
  const [percent, setPercent] = useState<number>(5.5)
  const [cost, setCost] = useState('4 000 000')
  const [downPayment, setDownPayment] = useState('2 000 000')
  const [time, setTime] = useState<string>('10')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string>('')
  const isSx = useIsMaxWidth(320)
  const timeRef = useRef<HTMLInputElement>(null)

  const addSpace = (num: number | string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const removeNonNumeric = (num: number | string) => num.toString().replace(/[^0-9]/g, '')

  const addSymbol = (value: string) =>
    value
      .split('')
      .filter((val) => val !== '₽')
      .join('')

  const [shownRequestCallBack, setShownRequestCallBack] = useState(false)
  const handleRequestCallBackDrawerClose = () => {
    setShownRequestCallBack(false)
  }

  const calculate = async () => {
    try {
      setError('')
      const response = await fetch('/api/mortgage/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_cost: parseFloat(removeNonNumeric(cost)),
          initial_payment: parseFloat(removeNonNumeric(downPayment)),
          years: parseInt(time),
          mortgage_type: percent === 5.5 ? 'basic' : 'family'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate mortgage')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Ошибка при расчете. Попробуйте позже.')
      console.error('Calculation error:', err)
    }
  }

  // Автоматический расчет при изменении параметров
  useEffect(() => {
    calculate()
  }, [cost, downPayment, time, percent])

  const formatCurrency = (value: number) => {
    return `${addSpace(Math.round(value))} ₽`
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.title}>Посчитайте вашу выгоду</div>
        <div className={styles.mainContent}>
          <div className={styles.dataInputOuter}>
            <div className={styles.selectorsWrapper}>
              <TabsUIItem
                tabName={'Базовая от 5.5%'}
                setActiveTabIndex={() => setPercent(5.5)}
                activeIndex={percent === 5.5 ? 1 : 2}
                index={1}
                fill={'white'}
                extraClass={styles.button}
              />
              <TabsUIItem
                tabName={'Семейная от 3.5%'}
                setActiveTabIndex={() => setPercent(3.5)}
                activeIndex={percent === 5.5 ? 1 : 2}
                index={2}
                fill={'white'}
                extraClass={styles.button}
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
                minValue={1}
                maxValue={30}
                extraClass={styles.rangeInput}
                theme={'dark'}
                icon={true}
                isNeedToClear={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log('Slider value:', e.target.value)
                  setTime(e.target.value)
                }}
                ref={timeRef}
                textAfterValue={'лет'}
              />
            </div>
          </div>
          <div className={styles.conditions}>
            <StarIcon className={styles.star} />
            <div className={styles.subTitle}>
              {percent === 5.5 ? 'Базовая' : 'Семейная'} ипотека
              <div className={styles.showPercentWrapper}>
                от
                <span>{percent}%</span>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.infoWrapper}>
              <div className={styles.lineWrapper}>
                <div className={`${styles.infoBlock} ${styles.selected}`}>
                  <div className={styles.sum}>{result ? formatCurrency(result.monthly_payment) : '14 900 ₽'}</div>
                  <div className={styles.infoText}>Ежемесячный платеж</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>{result ? formatCurrency(result.overpayment) : '2 094 168 ₽'}</div>
                  <div className={styles.infoText}>Переплата по кредиту</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>{result ? formatCurrency(result.recommended_income) : '49 951 ₽'}</div>
                  <div className={styles.infoText}>Рекомендуемый доход</div>
                </div>
              </div>

              <div className={styles.lineWrapper}>
                <div className={styles.infoBlock}>
                  <div className={styles.sum}>{result ? formatCurrency(result.loan_amount) : '1 500 000 ₽'}</div>
                  <div className={styles.infoText}>Сумма {isSx && <br />}кредита</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>{result ? formatCurrency(result.total_payment) : '3 594 168 ₽'}</div>
                  <div className={styles.infoText}>Общая {isSx && <br />}выплата</div>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.sum}>{result ? formatCurrency(result.tax_deduction) : '532 242 ₽'}</div>
                  <div className={styles.infoText}>Налоговый {isSx && <br />}вычет</div>
                </div>
              </div>
            </div>

            <FullButton
              type={'Button'}
              buttonText={`РАССЧИТАТЬ`}
              activeButton={true}
              border={false}
              borderColor={'none'}
              extraClass={styles.button}
              buttonFill={`white`}
              buttonElementColor={`black`}
              buttonBorderRadius={'6px'}
              onClick={calculate}
            />

            <FullButton
              type={'Button'}
              buttonText={`СВЯЗАТЬСЯ С НАМИ`}
              activeButton={true}
              border={false}
              borderColor={'none'}
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
