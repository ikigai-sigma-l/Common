import * as PIXI from 'pixi.js'
import { View } from '../../../core/View'
import { StopButtonViewModel } from './StopButtonViewModel'
import { ButtonView } from '../ButtonView'

export class StopButtonPrefab {

    private view: ButtonView | null = null
    private viewModel: StopButtonViewModel | null = null

    public initial() {
        this.view = new ButtonView()
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

    public size(width: number, height: number) {
        const background = this.view?.getObject('background') as PIXI.Sprite
        if (!background) return
            
        background.width = width
        background.height = height
    } 
}

