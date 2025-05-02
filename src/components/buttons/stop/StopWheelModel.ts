import { IObservable, Observable } from "../../../observable/Observable"


export class StopWheelModel {
    public isRun = Observable<boolean>(false)
}