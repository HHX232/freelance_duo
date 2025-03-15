import {useState} from 'react'
import CustomSelectWithDropdown from '../SelectInputUI/SelectInputUI'

export const SelectExample = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [hasError, setHasError] = useState(false)

  const [vals, setVals] = useState<string[]>([])

  const options = [
    {value: 'option1', label: 'Option 1'},
    {value: 'option2', label: 'Option 2'},
    {value: 'option3', label: 'Option 3'},
    {value: 'option4', label: 'Option 4'},
    {value: 'option5', label: 'Option 5'},
    {value: 'option6', label: 'Option 6'},
    {value: 'option7', label: 'Option 7'},
    {value: 'option8', label: 'Option 8'},
    {value: 'option9', label: 'Option 9'},
    {value: 'option10', label: 'Option 10'},
    {value: 'option11', label: 'Option 11'},
    {value: 'option12', label: 'Option 12'},
    {value: 'option13', label: 'Option 13'},
    {value: 'option14', label: 'Option 14'},
    {value: 'option15', label: 'Option 15'}
  ]

  const LeftIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <circle cx='12' cy='12' r='10' />
    </svg>
  )

  return (
    <div style={{maxWidth: '400px', padding: '20px', background: '#11627D'}}>
      <h3 style={{color: '#FFF', marginBottom: '20px'}}>Custom Select Demo</h3>

      <div style={{marginBottom: '30px'}}>
        <h2>{selectedValue}</h2>
        <CustomSelectWithDropdown
          error='rer'
          theme='white'
          options={options}
          labelTopText={'Hi'}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder='Select option'
          leftIcon={<LeftIcon />}
        />
      </div>

      <div style={{marginBottom: '30px'}}>
        <h2>{selectedValue}</h2>
        <CustomSelectWithDropdown
          error='rer'
          theme='white'
          options={options}
          labelTopText={'Hi'}
          values={vals}
          onMultipleChange={setVals}
          placeholder='Select option'
          leftIcon={<LeftIcon />}
          multiple
        />
      </div>

      {/* Пример с ошибкой */}
      <div style={{marginBottom: '30px'}}>
        <CustomSelectWithDropdown
          theme='white'
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          error={hasError.toString()}
          placeholder='With error state'
        />
        <button onClick={() => setHasError(!hasError)} style={{marginTop: '10px', color: '#FFF'}}>
          Toggle Error
        </button>
      </div>

      {/* Отключенное состояние */}
      <div style={{marginBottom: '30px'}}>
        <CustomSelectWithDropdown
          theme='white'
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          disabled={true}
          placeholder='Disabled state'
        />
        <button onClick={() => setIsDisabled(!isDisabled)} style={{marginTop: '10px', color: '#FFF'}}>
          Toggle Disabled
        </button>
      </div>

      {/* Пример с кастомной стрелкой */}
      <CustomSelectWithDropdown
        theme='white'
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder='Custom arrow'
        rightIcon={
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#FFF' strokeWidth='3'>
            <path d='M6 9l6 6 6-6' />
          </svg>
        }
      />
    </div>
  )
}
