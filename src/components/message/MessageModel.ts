import { IObservable, Observable } from "../../observable/Observable"

export class MessageModel {
    public text = Observable<string>('')
}