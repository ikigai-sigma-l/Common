import { Observable } from '../observable/Observable'


export enum SpinState {
  None = 0,
  NormalSpin = 1 << 0,
  AutoSpin = 1 << 1,
  FreeSpin = 1 << 2,
  MiniGame = 1 << 3,
  WheelGame = 1 << 4,
  TurboSpin = 1 << 5,
}

export class GameUiStore {
  betValue = Observable<number>(4)
  autoSpinLeft = Observable<number>(0)
  freeSpinLeft = Observable<number>(0)
  spinState = Observable<number>(SpinState.None)
  balance = Observable<number>(1200)
  lastActTime = Observable<number>(0)
  isAudioCompleted = Observable<boolean>(false)
}

export const useGameUiStore = new GameUiStore()
