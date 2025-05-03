import * as PIXI from 'pixi.js'
import { TimerView } from './TimerView'
import { TimerViewModel } from './TimerViewModel'

export class TimerPrefab {

    private view: TimerView | null = null
    private viewModel: TimerViewModel | null = null

    public initial() {
        this.view = new TimerView()
        this.view.initial()

        this.viewModel = new TimerViewModel()
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
        const list: TimerView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }
}

