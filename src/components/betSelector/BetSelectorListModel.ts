import { Style } from "../../core/View"
import { IObservable, Observable } from "../../observable/Observable"

export class BetSelectorListModel {
    public style = Observable<Style>(Style.Portrait)
}