import { IObservable, Observable } from "../../../observable/Observable"

export enum SpinButtonState {
    Normal,
    Focus,
    Push,
    Disable,
}

export class SpinButtonModel {
    public state = Observable<SpinButtonState>(SpinButtonState.Normal)
    public isSpeedUp = Observable<boolean>(false)
}