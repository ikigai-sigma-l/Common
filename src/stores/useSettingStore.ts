import { Observable } from 'src/observable/Observable'

export enum ReelSpeed {
    Regular = 0,
    Fast, 
    SuperFast
}

export class SettingStore {
    speedLevel = Observable<ReelSpeed>(ReelSpeed.Regular)
    isMute = Observable<boolean>(false)
    autoCount = Observable<number>(10)
    batterySaving = Observable<boolean>(false)
    isMusicOn = Observable<boolean>(true)
    isSoundOn = Observable<boolean>(true)
}

export const useSettingStore = new SettingStore()
