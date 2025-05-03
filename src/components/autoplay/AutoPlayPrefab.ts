import { AutoPlayView } from "./AutoPlayView"
import { AutoPlayViewModel } from "./AutoPlayViewModel"


export class AutoPlayPrefab {
    private view: AutoPlayView | null = null
    private viewModel: AutoPlayViewModel | null = null

    public initial() {
        this.release()

        this.view = new AutoPlayView()
        this.view.initial()

        this.viewModel = new AutoPlayViewModel()
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
        const list: AutoPlayView[] = []
        if (this.view) list.push(this.view)
        return list
    }
}