export interface ReservationInterface {
  name: string
  surname: string
  patronymic?: string
  born: string
  passport_series: string
  passport_number: string
}

export interface IDeal {
  sdelkaGuid: string
  objectGuid: string
  price: number
  dataReserv: string
  dataReservEnd: string
  step: string
  contractType: string
}

export interface ReservationItem {
  success: boolean
  user: {
    status: string
    data: {
      deals: IDeal[]
    }
  }
}

export interface IAllow {
  status: string
  data: {
    allow: boolean
    reason: string
    price: number
    priceMeter: number
    status: string
    Bookingprice: number
  }
}
