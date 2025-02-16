export interface Parameter {
  id: number
  IDElement: string
  Value: string
  created_at: string | null
  updated_at: string | null
}

export interface Parametrs {
  Параметры: Parameter[]
  'Летние помещения': Parameter[]
  Отделка: Parameter[]
}

interface Squares {
  min: number
  max: number
}

interface Price {
  min: number
  max: number
}

export interface IFilterInterface {
  flats_plandates: string[]
  flats_types: string[]
  parametrs: Parametrs
  flats_square: Squares
  flats_price: Price
}
