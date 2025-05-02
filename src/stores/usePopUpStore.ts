import { Observable } from '../observable/Observable'

export enum PopUpState {
  None = 0,
  CheatTool = 1,
  AutoPlay = 2,
  GetFreeSpin = 3,
  WinFreeSpin = 4,
  BetSelector = 5,
  Setting = 6,
  GameInfo = 7,
}

export class PopUpStore {
  current = Observable<PopUpState>(PopUpState.None)
}

export const usePopUpStore = new PopUpStore()
