import { BetSelectorView } from "./BetSelectorView"
import { BetSelectorViewModel } from "./BetSelectorViewModel"


export class BetSelectorPrefab {
    private view: BetSelectorView | null = null
    private viewModel: BetSelectorViewModel | null = null

    public initial() {
        this.release()

        this.view = new BetSelectorView()
        this.view.initial()

        this.viewModel = new BetSelectorViewModel()
        this.viewModel.initial()
        this.viewModel.bind(this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: BetSelectorView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    
}