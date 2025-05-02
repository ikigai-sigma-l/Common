import * as PIXI from 'pixi.js'
import { View } from '../../../core/View'
import { StopButtonViewModel } from './StopButtonViewModel'
import { StopButtonView } from './StopButtonView'

export class StopButtonPrefab {

    private view: StopButtonView | null = null
    private viewModel: StopButtonViewModel | null = null

    public initial() {
        this.view = new StopButtonView()
        this.view.initial()

        this.viewModel = new StopButtonViewModel()
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
        const list: View[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        this.getViews().forEach((view) => {
            const container = view.getContainer()
            if (container) container.position.set(x, y)
        })
    }
}

