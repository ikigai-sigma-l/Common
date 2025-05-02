import * as PIXI from 'pixi.js'
import { SpeedButtonViewModel } from './SpeedButtonViewModel'
import { ButtonView } from '../ButtonView'


export class SpeedButtonPrefab {

    private view: ButtonView | null = null
    private viewModel: SpeedButtonViewModel | null = null

    public initial() {
        this.view = new ButtonView()
        this.view.initial()

        this.viewModel = new SpeedButtonViewModel()
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
        const list: ButtonView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }

    public size(width: number, height: number) {
        const background = this.view?.getObject('background') as PIXI.Sprite
        if (!background) return
        
        background.width = width
        background.height = height
    }
}

