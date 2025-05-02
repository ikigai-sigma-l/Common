import { IObservable, Observable } from "../../observable/Observable"

export class SettingToggleItemModel {
    public title = Observable<string>('BATTERY SAVER')
    public describe = Observable<string>('Save battery life by reducing animation speed')
    public enable = Observable<boolean>(true)
}