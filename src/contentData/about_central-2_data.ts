interface NumberItem {
  number: number
  text: string
  currency?: string
}

export type PageWithNumberTypes = NumberItem[][]

export const aboutCentral2Data: PageWithNumberTypes = [
  [
    {
      number: 4,
      text: 'торговых бульвара',
      currency: 'лет'
    },
    {
      number: 150,
      text: 'мест в детском саду с бассейном и закрытой территорией',
      currency: 'лет'
    },
    {
      number: 550,
      text: 'мест в лицее',
      currency: 'лет'
    }
  ],
  [
    {
      number: 500,
      text: 'Опыт работы',
      currency: 'лет'
    },
    {
      number: 600,
      text: 'Опыт работы',
      currency: 'лет'
    }
  ],
  [
    {
      number: 4,
      text: 'торговых бульвара',
      currency: 'лет'
    },
    {
      number: 150,
      text: 'мест в детском саду с бассейном и закрытой территорией',
      currency: 'лет'
    },
    {
      number: 550,
      text: 'мест в лицее',
      currency: 'лет'
    }
  ]
]
