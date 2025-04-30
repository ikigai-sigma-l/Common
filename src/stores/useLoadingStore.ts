import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface ILoadingStore {
  percent: number
  visible: boolean
}

export const useLoadingStore = create<ILoadingStore>()(
  subscribeWithSelector((set, get) => ({
    percent: 0,
    visible: true
}))
)
