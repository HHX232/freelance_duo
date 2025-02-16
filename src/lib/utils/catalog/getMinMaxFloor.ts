import {IObj} from '@src/types/object.interface'

export const getMinMaxFloor = (flats: IObj[]): {minFloor: number; maxFloor: number} => {
  if (flats.length === 0) {
    throw new Error('The array of flats is empty')
  }

  const floors = flats.map((flat) => parseInt(flat.Floor, 10)).filter((floor) => !isNaN(floor))

  if (floors.length === 0) {
    throw new Error('No valid floor values found')
  }

  const minFloor = Math.min(...floors)
  const maxFloor = Math.max(...floors)

  return {minFloor, maxFloor}
}
