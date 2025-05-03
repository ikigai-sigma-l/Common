import { IObservable, Observable } from "../../observable/Observable"

export type AutoPlayConfirmButtonStyle = {
    width: number,
    height: number,
    round: number,
    fontSize: number,
    border: number,
}

export class AutoPlayConfirmButtonModel {
    public style = Observable<AutoPlayConfirmButtonStyle>({ width: 32, height: 32, round: 16, fontSize: 20, border: 4 })
}