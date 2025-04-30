import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand'

interface IData<T> {
  value: T
}

type Condition<T> = ((val: T) => boolean) | null

export class IObservable<T> {
  private value: UseBoundStore<StoreApi<IData<T>>>

  public constructor(initializer: StateCreator<IData<T>, [], []>) {
    this.value = create<IData<T>>(initializer)
  }

  public get() {
    return this.value.getState().value
  }

  public set(value: T) {
    if (this.value) {
      if (this.value.getState().value != value) {
        this.value.setState({ value: value })
      }
    }
  }

  public subscribe(listener: (cur: T, prev?: T) => void) {
    if (!this.value || !listener) return null
    listener(this.value.getState().value)
    return this.value?.subscribe((cur, prev) => listener(cur.value, prev.value))
  }

  public once(condition: Condition<T>): Promise<void> {
    if (!this.value || !condition) return Promise.resolve()
    if (condition(this.value.getState().value)) return Promise.resolve()
      
    return new Promise<void>((resolve, reject) => {
      if (!this.value) return reject()

      const unsubscribe = this.value?.subscribe((cur) => {
        if (condition(cur.value)) {
          unsubscribe()
          resolve()
        }
      })
    })
  }
}

export function Observable<T>(initializer: T) {
  return new IObservable<T>(() => ({
    value: initializer,
  }))
}

export type UnSubscribe = (() => void) | null
export type UnSubscribes = UnSubscribe[] | null
