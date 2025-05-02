import { ControlPanelView } from "./ControlPanelView"
import { ControlPanelViewModel } from "./ControlPanelViewModel"


export class ControlPanelPrefab {

    protected view: ControlPanelView | null = null

    protected viewModel: ControlPanelViewModel | null = null

    public initial() {
        this.view = new ControlPanelView()
        this.view.initial()

        this.viewModel = new ControlPanelViewModel()
        this.viewModel.bind(this.view)
    }
    
    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const views = []
        if (this.view) views.push(this.view)
        return views
    }
}