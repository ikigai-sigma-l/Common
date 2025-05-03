import { IObservable, Observable } from "../../observable/Observable"

export type AutoPlayCountButtonStyle = {
    width: number,
    height: number,
    round: number,
    fontSize: number
}

export class AutoPlayCountButtonModel {
    public count = Observable<number>(1)
    public isOn = Observable<boolean>(false)
    public style = Observable<AutoPlayCountButtonStyle>({ width: 32, height: 32, round: 16, fontSize: 20 })
}