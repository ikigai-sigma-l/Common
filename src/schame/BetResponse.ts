export const STATUS_TYPE = {
  INITIATED: 'initiated',
  OPENED: 'opened',
  FAILED: 'failed',
  PENDING: 'pending',
  FINISHED: 'finished',
}

export type GamePhaseType = 'regular' | 'freeSpin' | 'wheelGame' | 'miniGame' | 'transferRegular' | 'transferFree'
export type PlaygroundType = 'basic' | 'miniGame'

export enum ActionType {
  None = 0,
  FreeGame = 1,
  Hold = 2,
  WheelGame = 3,
  MiniGame = 4,
}

export interface BoostGameData {
  boost: number
  idx: number
}

export interface ExtraGameData {
  extra: number
  idx: number
}

export interface Payout {
  symbol: number
  coins: number
  oak: number
  positions: number
}

export interface Feature {
  freeSpins?: number
  wildMultiplier?: number[]
  triggerMiniGame?: boolean
  triggerWheelGame?: boolean
  totalFreeSpinMultiplier?: number
}

export interface SymbolResult {
  coins: number
  final: number[]
  payouts: Payout[]
}

export interface PlaygroundField {
  coins: number
  symbols: SymbolResult
  features: Feature
}

export interface Playground {
  type: PlaygroundType
  coins: number
  fields: PlaygroundField[]
}

export interface GamePhase {
  type: GamePhaseType
  coins: number
  playgrounds: Playground[]
}

export interface Summary {
  coins: number
  hasMaxWin: boolean
}

export interface GameStep {
  gamePhases: GamePhase[]
  summary: Summary
}

export interface BetResponseData {
  roundId: string
  balance: number
  results: {
    gameResponse: {
      step: GameStep
      meta: {
        public: object
      }
      finished?: boolean
      choices?: number[]
    }
  }
  status: string
  actions: ActionType[]
  failure?: boolean
}

export interface BetResponse {
  data: BetResponseData
}
