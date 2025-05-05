import * as PIXI from 'pixi.js'
import { MessageModel } from './MessageModel'
import { MessageView } from './MessageView'
import { MessageViewModel } from './MessageViewModel'

export class MessagePrefab {

    private model = new MessageModel()
    private view: MessageView | null = null
    private viewModel: MessageViewModel | null = null

    public initial() {
        this.view = new MessageView()
        this.view.initial()

        this.viewModel = new MessageViewModel()
        this.viewModel?.bind(this.model, this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: MessageView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }

    public show(isVisible: boolean) {
        const container = this.view?.getContainer()
        if (container) container.visible = isVisible
    }

    public text(key: string) {
        this.model.text.set(key)
    }
}

