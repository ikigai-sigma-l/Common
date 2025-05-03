import * as PIXI from 'pixi.js'
import { AutoSpinLeftView } from './AutoSpinLeftView'
import { AutoSpinLeftViewModel } from './AutoSpinLeftViewModel'

export class AutoSpinLeftPrefab {

    private view: AutoSpinLeftView | null = null
    private viewModel: AutoSpinLeftViewModel | null = null

    public initial() {
        this.view = new AutoSpinLeftView()
        this.view.initial()

        this.viewModel = new AutoSpinLeftViewModel()
        this.viewModel?.bind(this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: AutoSpinLeftView[] = []
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

