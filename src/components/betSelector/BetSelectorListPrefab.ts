import { Style } from "src/core/View"
import { BetSelectorListModel } from "./BetSelectorListModel"
import { BetSelectorListView } from "./BetSelectorListView"
import { BetSelectorListViewModel } from "./BetSelectorListViewModel"



export class BetSelectorListPrefab {
    private model: BetSelectorListModel = new BetSelectorListModel()
    private view: BetSelectorListView | null = null
    private viewModel: BetSelectorListViewModel | null = null

    public initial() {
        this.release()

        this.view = new BetSelectorListView()
        this.view.initial()

        this.viewModel = new BetSelectorListViewModel()
        this.viewModel.initial()
        this.viewModel.bind(this.model, this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: BetSelectorListView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public setStyle(style: Style) {
        this.model.style.set(style)
    }
}