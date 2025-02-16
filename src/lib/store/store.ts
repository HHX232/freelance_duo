import create from 'zustand'
import {persist} from 'zustand/middleware'
import {createAuthSlice, IAuthSlice} from '@src/lib/store/slices/auth'
import {createDataSlice, IDataSlice} from '@src/lib/store/slices/data'

export interface BaseSlice {
  // Общие свойства, если понадобится :)
}

export interface ICombinedSlice extends IAuthSlice, IDataSlice {}

export const useStore = create<ICombinedSlice>(
  persist(
    (set, get, api) => ({
      ...createAuthSlice(set, get, api),
      ...createDataSlice(set, get, api)
    }),
    {name: 'kronfort'}
  )
)
