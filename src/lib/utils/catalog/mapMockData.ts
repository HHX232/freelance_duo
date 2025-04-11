export const mapPoi = [
    { coords: [60.008737, 29.722807], name: "Школа №418", icon: 'school_icon.svg' },
    { coords: [60.010447, 29.718372], name: "Школа Levita", icon: 'school_icon.svg' },
    { coords: [59.992921, 29.751772], name: "Школа №425", icon: 'school_icon.svg' },
    { coords: [59.990313, 29.771857], name: "Школа №662", icon: 'school_icon.svg' },
    { coords: [59.994810, 29.761394], name: "Школа танцев Балтийское созвездние", icon: 'school_icon.svg' },
    { coords: [59.999359, 29.769141], name: "Школа №422", icon: 'school_icon.svg' },
    { coords: [59.995334, 29.781155], name: "Школа №423", icon: 'school_icon.svg' },
    { coords: [59.986713, 29.787012], name: "Школа №427", icon: 'school_icon.svg' },
    { coords: [60.001739, 29.736115], name: "Фитнесс - центр Кронштадт", icon: 'sport_icon.svg' },
    { coords: [60.009166, 29.719139], name: "Детский сад №18 к2", icon: 'kindergarden_icon.svg' },
    { coords: [60.010264, 29.724866], name: "Детский сад №18 к1", icon: 'kindergarden_icon.svg' },
    { coords: [60.000605, 29.764102], name: "Детский сад №4", icon: 'kindergarden_icon.svg' },
    { coords: [59.996789, 29.764724], name: "Детский сад №14", icon: 'kindergarden_icon.svg' },
    { coords: [59.992567, 29.758169], name: "Детский сад №1 Красная шапочка", icon: 'kindergarden_icon.svg' },
    { coords: [59.996152, 29.769722], name: "Детский сад №6", icon: 'kindergarden_icon.svg' },
    { coords: [59.994794, 29.780152], name: "Детский сад №13", icon: 'kindergarden_icon.svg' },
    { coords: [59.989021, 29.789744], name: "Детский сад №8", icon: 'kindergarden_icon.svg' },
    { coords: [59.994020, 29.748576], name: "Школа", icon: 'school_icon.svg' },
    { coords: [59.998730, 29.758308], name: "Ресторан", icon: 'restorant_icon.svg' },
    { coords: [60.010695, 29.719637], name: "Городская поликлиника № 74", icon: 'medicine_icon.svg' },
    { coords: [59.996170, 29.757294], name: "Detskaya poliklinika № 74", icon: 'medicine_icon.svg' },
    { coords: [59.999478, 29.762282], name: "Gorodskaya bolnitsa Svyatogo Pravednogo Ioanna", icon: 'medicine_icon.svg' },
    { coords: [59.994214, 29.784891], name: "Городская поликлиника № 74", icon: 'medicine_icon.svg' },
    { coords: [59.992863, 29.789059], name: "Gbuz city polyclinic № 74", icon: 'medicine_icon.svg' },
    { coords: [59.990753, 29.789305], name: "Медицинский центр", icon: 'medicine_icon.svg' },
    { coords: [59.989298, 29.763328], name: "Парк", icon: 'park_icon.svg' },
    { coords: [60.010156, 29.719119], name: "Котлин молл", icon: 'mall_icon.svg' },
    { coords: [59.997628, 29.765570], name: "Kronshtadtskiy mall", icon: 'mall_icon.svg' },
    { coords: [59.989276, 29.734820], name: "Городской кластер Остров фортов", icon: 'coast_icon.svg' },
    { coords: [59.999664, 29.746338], name: "Кронфорт", icon: 'kf_orange_icon.svg' },
    { coords: [59.994099, 29.755499], name: "Кронфорт", icon: 'kf_red_icon.svg' },
    { coords: [60.001163, 29.737410], name: "Кронфорт набережная", icon: 'kf_green_icon.svg' }
  ]

  export const mapKFPoi = [
    { coords: [59.999664, 29.746338], name: "Кронфорт", icon: 'kf_orange_icon.svg' },
    { coords: [59.994099, 29.755499], name: "Кронфорт", icon: 'kf_red_icon.svg' },
    { coords: [60.001163, 29.737410], name: "Кронфорт набережная", icon: 'kf_green_icon.svg' }
  ]

  export const mapRoutes = [
    {
      points: [
        [60.000921, 29.751304], // Стартовая точка
        [60.017535, 29.725353] // Конечная точка
      ],
      arrow: {direction: 'top_right', coords: [60.017535, 29.725353]},
      color: '#148F88',
      lineWidth: 4,
      hint: 'Выезд на КАД'
    },
    {
      points: [
        [60.007338, 29.710894],
        [60.010576, 29.728042]
      ],
      arrow: {direction: 'bottom', coords: [60.007338, 29.710894]},
      color: '#D36281',
      lineWidth: 4,
      hint: 'Выезд на КАД'
    },
    {
      points: [
        [60.017535, 29.725353],
        [60.057689, 29.976343]
      ],
      arrow: {direction: 'top', coords: [60.057689, 29.976343]},
      color: '#FD7628',
      lineWidth: 4,
      hint: 'До курортного района'
    },
    {
      points: [
        [60.037062, 29.977285],
        [59.994602, 30.132214]
      ],
      arrow: {direction: 'right2', coords: [59.994602, 30.132214]},
      color: '#277B97',
      lineWidth: 4,
      hint: 'До Лахта - центра'
    },
    {
      points: [
        [59.994602, 30.132214],
        [59.984066, 30.238037]
      ],
      arrow: {direction: 'right', coords: [59.984066, 30.238037]},
      color: '#D38F6D',
      lineWidth: 4,
      hint: 'До центра Петербурга'
    }
  ];