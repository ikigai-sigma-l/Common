import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface ILoadingStore {
  percent: number
}

export const useLoadingStore = create<ILoadingStore>()(
  subscribeWithSelector((set, get) => ({
    percent: 0,
}))
)
