export interface IAuth {
  success: boolean
  token: string
}

export interface IAuthProfile {
  success: boolean
  user: IUser
}

export interface IUser {
  id: number
  phone: string
  guid: string
  born: null | string
  created_at: string
  updated_at: string
  email: string
  name: string
  surname: string
  patronymic: string | null
  passport_number: null | string
  passport_scans: null | string
  passport_series: null | string
  source: null | string
}
