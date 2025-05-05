import { GamePhaseType, Payout } from '../schame/BetResponse'
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

export enum SpinAnimState {
  Idle,
  Run,
  Stop
}

export class GameUiStore {
  betValue = Observable<number>(4)
  gamePhase = Observable<GamePhaseType>('regular')
  autoSpinLeft = Observable<number>(0)
  freeSpinLeft = Observable<number>(0)
  spinState = Observable<number>(SpinState.None)
  spinAnim = Observable<SpinAnimState>(SpinAnimState.Idle)
  stopEnable = Observable<boolean>(false)
  balance = Observable<number>(1200)
  lastActTime = Observable<number>(0)
  isAudioCompleted = Observable<boolean>(false)
  totalWin = Observable<{ value: number, duration: number}>({ value: 0, duration: 0 })
  payout = Observable<Payout[]>([])
}

export const useGameUiStore = new GameUiStore()
