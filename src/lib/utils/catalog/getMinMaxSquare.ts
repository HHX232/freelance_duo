import {IObj} from '@src/types/object.interface'

export const getMinMaxSquare = (flats: IObj[]): {minSquare: number; maxSquare: number} => {
  if (flats.length === 0) {
    throw new Error('The array of flats is empty')
  }

  const squares = flats.map((flat) => parseFloat(flat.Tsquare)).filter((tsquare) => !isNaN(tsquare))

  if (squares.length === 0) {
    throw new Error('No valid square values found')
  }

  const minSquare = Math.floor(Math.min(...squares))
  const maxSquare = Math.floor(Math.max(...squares))

  return {minSquare, maxSquare}
}
