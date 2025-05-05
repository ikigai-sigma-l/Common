import * as PIXI from 'pixi.js'
import { AttributeModel } from './AttributeModel'
import { AttributeView } from './AttributeView'
import { AttributeViewModel } from './AttributeViewModel'

export class AttributePrefab {

    private model: AttributeModel = new AttributeModel()
    private view: AttributeView | null = null
    private viewModel: AttributeViewModel | null = null

    public initial() {
        this.view = new AttributeView()
        this.view.initial()

        this.viewModel = new AttributeViewModel()
        this.viewModel.bind(this.model, this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: AttributeView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }

    public title(title: string) {
        this.model.title.set(title)
    }

    public value(value: string) {
        this.model.value.set(value)
    }

    public width() {
        return this.view?.getContainer()?.width ?? 0
    }
}

