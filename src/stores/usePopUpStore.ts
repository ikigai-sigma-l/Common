import { Observable } from '../observable/Observable'

export enum PopUpState {
  None = 0,
  CheatTool = 1,
  AutoPlay = 2,
  BetSelector = 3,
  Setting = 4,
  GameInfo = 5,
}

export class PopUpStore {
  current = Observable<PopUpState>(PopUpState.None)
}

export const usePopUpStore = new PopUpStore()
