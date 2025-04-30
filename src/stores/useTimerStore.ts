import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface ITimerStore {
  currentMs: number
  currentSec: number
  delta: number,
  refresh: (val: number) => void
}

export const useTimerStore = create<ITimerStore>()(
  subscribeWithSelector((set, get) => ({
    currentMs: 0,
    currentSec: 0,
    delta: 0,

    refresh: (timestamp: number) =>
      set({
        currentMs: timestamp,
        currentSec: Math.ceil(timestamp / 1000),
        delta: Math.max(timestamp - get().currentMs, 40) * 0.001
      }),
  }))
)
