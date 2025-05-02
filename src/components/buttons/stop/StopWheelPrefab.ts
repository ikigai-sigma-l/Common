import * as PIXI from 'pixi.js'
import { View } from '../../../core/View'
import { StopWheelView } from './StopWheelView'
import { StopWheelViewModel } from './StopWheelViewModel'
import { StopWheelModel } from './StopWheelModel'

export class StopWheelPrefab {
    private model: StopWheelModel = new StopWheelModel()
    private view: StopWheelView | null = null
    private viewModel: StopWheelViewModel | null = null

    public initial() {
        this.view = new StopWheelView()
        this.view.initial()

        this.viewModel = new StopWheelViewModel()
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
        const list: View[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public run(val: boolean) {
        this.model.isRun.set(val)
    }
}

