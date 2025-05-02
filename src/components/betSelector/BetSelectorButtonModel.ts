import { IObservable, Observable } from "../../observable/Observable"

export type ButtonStyle = {
    width: number,
    height: number,
    round: number,
    headSize: number,
    contentSize: number,
}

export class BetSelectorButtonModel {
    public betValue = Observable<number>(0.25)
    public isOn = Observable<boolean>(false)
    public style = Observable<ButtonStyle>({ width: 32, height: 32, round: 4, headSize: 16, contentSize: 12 })
}