import {IObj} from '@src/types/object.interface'

export const getMinMaxPrice = (flats: IObj[]): {minPrice: number; maxPrice: number} => {
  if (flats.length === 0) {
    throw new Error('The array of flats is empty')
  }

  const prices = flats.map((flat) => parseFloat(flat.Fvalue)).filter((price) => !isNaN(price))

  if (prices.length === 0) {
    throw new Error('No valid price values found')
  }

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  return {minPrice, maxPrice}
}
