import { IObservable, Observable } from "../../../observable/Observable"

export class AttributeModel {
    public title = Observable<string>('')
    public value = Observable<string>('0')
}