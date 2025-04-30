import { Observable } from 'src/observable/Observable'


export class EnvironmentStore {
  lastActTime = Observable<number>(0)
  isReadyToPlaySound = Observable<boolean>(false)
  isAudioCompleted = Observable<boolean>(false)
}

export const useEnvironmentStore= new EnvironmentStore()
