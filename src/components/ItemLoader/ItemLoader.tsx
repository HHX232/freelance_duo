import ContentLoader from 'react-content-loader'
import {ReactElement} from 'react'

export const ItemLoader = (): ReactElement => (
  <ContentLoader
    speed={3}
    style={{
      maxWidth: '312px'
    }}
    height={446}
    viewBox='0 0 311 446'
    backgroundColor='#fff'
    foregroundColor='#ecebeb'
  >
    <rect x='0' y='0' rx='10' ry='10' width='315' height='216' />
    <rect x='0' y='230' rx='10' ry='10' width='180' height='26' />
    <rect x='0' y='270' rx='10' ry='10' width='120' height='15' />
    <rect x='0' y='290' rx='10' ry='10' width='80' height='15' />
    <rect x='0' y='310' rx='10' ry='10' width='140' height='15' />
    <rect x='0' y='350' rx='10' ry='10' width='315' height='1' />

    <rect x='0' y='365' rx='20' ry='20' width='180' height='40' />
  </ContentLoader>
)
