export interface ApartmentCardPageParams {
  params: {id: string}
}

export interface ApartmentCardPageResponse {
  Type: string
  Tsquare?: string
  Floor?: string
  Fvalue?: string

  Mvalue?:string
  Rvalue?:string

  Fprice?: string
  Dvalue?: string
  attributes?: string[]
  flat_plan?: string
  flat_plan_m?: string
  section_plan?: string
  floor_plan?: string
  ext_guid?: string
  Num: string
  Plandate?: string
  Building?: string
}
