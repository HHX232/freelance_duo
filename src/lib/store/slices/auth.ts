import {GetState, SetState, StoreApi} from 'zustand'
import {BaseSlice} from '@src/lib/store/store'

export interface IAuthSlice extends BaseSlice {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

export const createAuthSlice = <T extends IAuthSlice>(set: SetState<T>, get: GetState<T>, api: StoreApi<T>): T => ({
  ...api.getState(),
  token: null,
  setToken: (token) => set({...get(), token}),
  clearToken: () => set({...get(), token: null})
})
