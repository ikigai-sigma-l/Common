import { IObservable, Observable } from "../../observable/Observable"

export class SettingButtonItemModel {
    public title = Observable<string>('BATTERY SAVER')
    public icon = Observable<string>('')
}