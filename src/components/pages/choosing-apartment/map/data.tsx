'use client'
import {LatLngBoundsExpression} from 'leaflet'
import {ReactElement} from 'react'

interface Pin {
  coords: [number, number]
  vector: {
    content: (className?: string) => ReactElement
    width: number
    height: number
    bounds: LatLngBoundsExpression
  }
}
export const pins: Pin[] = [
  {
    coords: [250, 585],
    vector: {
      content: (className) => (
        <svg
          className={className}
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 661 422'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0 152.156L415.958 0L551.811 116.587V134.865L592.32 173.398V185.749L601.707 193.653L610.105 189.701L659.012 234.162L660.494 296.407L515.254 360.629L361.123 426.826L201.557 495L20.7485 214.401L0 152.156ZM165.988 215.425L382.859 126.997L379.401 119.587L398.174 113.659L402.126 130.949L407.066 135.889L409.536 151.698L466.841 210.485L469.311 224.317L482.65 238.644L312.71 304.347V311.758L247.006 338.434L241.572 315.71L165.988 215.425Z'
            fill='white'
            fillOpacity='0.3'
          />
        </svg>
      ),
      height: 495,
      width: 660,
      bounds: [
        [-35, 275],
        [-35 + 495, 275 + 660]
      ]
    }
  },
  {
    coords: [500, 350],
    vector: {
      content: (className) => (
        <svg
          className={className}
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 539 357'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.5 155.5L147.5 356.5L261.5 310.5L426.5 248.5L533.5 209.5L539 202.5L530 145L464.5 89.5L446.5 94L445 93L443.5 86.5L417 62.5L412 63.5L407 59.5L406.5 52.5L381.5 30L376.5 31.5L372.5 28L371.5 21L348.5 0.5L347.5 0L328 5.5L305.5 12L304.5 13L305.5 14.5L269.5 25L267.5 22.5L221.5 36V39.5L197.5 47L194.5 43.5L130.5 62L133 65.5L104.5 73L102.5 70.5L82.5 76L84 78.5L57.5 86L56 83.5L0 99L21 153L18.5 155.5ZM179 233L168 196L134.25 151.75L168 145L320.5 95.5L383.5 160L267 198L184 227.5L186 231.5L179 233Z'
            fill='white'
            fillOpacity='0.3'
          />
        </svg>
      ),
      height: 356,
      width: 539,
      bounds: [
        [260, 110],
        [260 + 356, 110 + 539]
      ]
    }
  },
  {
    coords: [660, 1050],
    vector: {
      content: (className) => (
        <svg
          className={className}
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 873 487'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7 261.5L74.5 317H89L130.5 353.5L132.5 366.5L265 478.5L278.5 471.5L297.5 487L550.5 369L557.5 311L559.5 296L444 225L455 220.5V215L470 208.5L647 311L672.5 313L864 224.5L872.5 184L868 181.5L870 167.5L858 162H862V154.5L716.5 89L698.5 87L692 84L651 64.5L642 57.5L521.5 2.5L512.5 6L502 0L476.5 8.5L472.5 6L303.5 58.5V63L301 68.5L225.5 91.5L219.5 88.5H208L189 94.5L93 123L89.5 129.5V136.5L59 147.5L56.5 152.5L51.5 155.5L54.5 187L47.5 192L44.5 195L22.5 202L17.5 183.5L12.5 180L0 183.5V202L7 261.5ZM181 230.5L142 244.5L277.5 346V358L287.5 366.5L294.5 373L417.5 320L302.5 242.5L301 185.5L482.5 122L548.5 156L554 154L644.5 201.5L647 206.5L675 218L688.5 211V205L731 188L651 152L590.5 120.5L499.5 77.5L341 131L339.5 134.5L178 184L181 230.5Z'
            fill='white'
            fillOpacity='0.3'
          />
        </svg>
      ),
      height: 487,
      width: 872,
      bounds: [
        [275, 660],
        [275 + 487, 660 + 872]
      ]
    }
  },
  {
    coords: [780, 1370],
    vector: {
      content: (className) => (
        <svg
          className={className}
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 446 184'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M276.5 161L209 183.5L163 163L154.5 155.5L32.5 101L0.5 88V54.5L9.5 51.5V41L35.5 33.5L39.5 35.5L42.5 33.5L68.5 24.5L72.5 26.5L82.5 22.5V20L121.5 8.5H126.5L136 7L148.5 0L182 3.5L183 6L273.5 11L379 22.5L392.5 24.5L405.5 28H409.5L446 39L438 85L402.5 97.5L360.5 82L241.5 71.5L159.5 61.5L132 71.5L185.5 95V100.5L203 108.5L240 95L282 113L276.5 161Z'
            fill='white'
            fillOpacity='0.3'
          />
        </svg>
      ),
      height: 183,
      width: 445,
      bounds: [
        [675, 1150],
        [675 + 183, 1150 + 446]
      ]
    }
  },
  {
    coords: [620, 1770],
    vector: {
      content: (className) => (
        <svg
          className={className}
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 502 240'
          fill='none'
        >
          <path
            d='M0.5 70L104.5 116V126L144.5 146L154.5 142.5L257.5 189V198L348.5 240L502 175.5V86.5V59L342 5L307.5 19.5L296 67.5L407 116.5L394 122.5L391 129L360 141.5L332 135V125L216.5 77L210 79.5L134.5 48L128.5 51L114 44L118 19.5L73 0.5L37.5 13.5L5 26L0.5 70Z'
            fill='white'
            fillOpacity='0.3'
          />
        </svg>
      ),
      height: 239,
      width: 501,
      bounds: [
        [482, 1420],
        [482 + 239, 1420 + 501]
      ]
    }
  }
]
