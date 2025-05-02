import { IObservable, Observable } from "../../observable/Observable"

export class ToggleModel {
    public enable = Observable<boolean>(true)
}