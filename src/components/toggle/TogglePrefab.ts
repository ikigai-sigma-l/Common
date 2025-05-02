import * as PIXI from 'pixi.js'
import { ToggleView } from './ToggleView'
import { ToggleViewModel } from './ToggleViewModel'
import { ToggleModel } from './ToggleModel'

export class TogglePrefab {
    private model: ToggleModel = new ToggleModel()
    private view: ToggleView | null = null
    private viewModel: ToggleViewModel | null = null

    public initial() {
        this.view = new ToggleView()
        this.view.initial()

        this.viewModel = new ToggleViewModel()
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
        const list: ToggleView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }

    public enable(isEnable: boolean) {
        this.model.enable.set(isEnable)
    }
}

