import { Spine } from "@esotericsoftware/spine-pixi-v8"
import { SpinGrowView } from "./spinGrowView"
import { SpinGrowViewModel } from "./spinGrowViewModel"


export class SpinGrowPrefab {

    protected view: SpinGrowView | null = null

    protected viewModel: SpinGrowViewModel | null = null

    public initial() {
        this.view = new SpinGrowView()
        this.view.initial()

        this.viewModel = new SpinGrowViewModel()
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
    
    public position(x: number, y: number) {
        this.getViews().forEach((view) => {
            const container = view.getContainer()
            if (container) container.position.set(x, y)
        })
    }
}