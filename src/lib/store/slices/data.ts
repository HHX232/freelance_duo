import {GetState, SetState, StoreApi} from 'zustand'
import {BaseSlice} from '@src/lib/store/store'

export interface IDataSlice extends BaseSlice {
  favorites: string[]
  compare: string[]
  latest: string[]
  addToFavorites: (objId: string) => void
  addToCompare: (objId: string) => void
  removeFromFavorites: (objId: string) => void
  removeFromCompare: (objId: string) => void
  getFavorites: () => string[]
  getCompare: () => string[]
  removeAllCompare: () => void
  addToLatest: (objId: string) => void
  getLatest: () => string[]
}

export const createDataSlice = <T extends IDataSlice>(set: SetState<T>, get: GetState<T>, api: StoreApi<T>): T => ({
  ...api.getState(),
  favorites: [],
  compare: [],
  latest: [],
  addToFavorites: (objId) => {
    const currentFavorites = get().favorites
    if (!currentFavorites.includes(objId)) {
      set((state) => ({favorites: [...state.favorites, objId]}))
    } else {
      set((state) => ({
        favorites: state.favorites.filter((id) => id !== objId)
      }))
    }
  },
  addToCompare: (objId) => {
    const currentCompare = get().compare
    if (!currentCompare.includes(objId)) {
      set((state) => ({compare: [...state.compare, objId]}))
    } else {
      set((state) => ({
        compare: state.compare.filter((id) => id !== objId)
      }))
    }
  },
  removeFromFavorites: (objId) => {
    set((state) => ({favorites: state.favorites.filter((id) => id !== objId)}))
  },
  removeFromCompare: (objId) => {
    set((state) => ({compare: state.compare.filter((id) => id !== objId)}))
  },
  removeAllCompare: () => {
    set({compare: []})
  },
  getFavorites: () => {
    return get().favorites
  },
  getCompare: () => {
    return get().compare
  },
  addToLatest: (objId) => {
    set((state) => {
      // Убираем элемент, если он уже есть в массиве
      const filteredLatest = state.latest.filter((id) => id !== objId)
      // Добавляем элемент в начало массива
      const updatedLatest = [objId, ...filteredLatest].slice(0, 5)
      return {latest: updatedLatest}
    })
  },
  getLatest: () => {
    return get().latest
  }
})
