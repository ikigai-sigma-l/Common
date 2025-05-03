import { InfoPanelView } from "./InfoPanelView";
import { InfoPanelViewModel } from "./InfoPanelViewModel";


export class InfoPanelPrefab {

    protected view: InfoPanelView | null = null

    protected viewModel: InfoPanelViewModel | null = null

    public initial() {
        this.view = new InfoPanelView()
        this.view.initial()

        this.viewModel = new InfoPanelViewModel()
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