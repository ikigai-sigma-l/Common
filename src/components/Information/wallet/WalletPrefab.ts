import * as PIXI from 'pixi.js'
import { WalletView } from './WalletView'
import { WalletViewModel } from './WalletViewModel'

export class WalletPrefab {

    private view: WalletView | null = null
    private viewModel: WalletViewModel | null = null

    public initial() {
        this.view = new WalletView()
        this.view.initial()

        this.viewModel = new WalletViewModel()
        this.viewModel.bind(this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: WalletView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }
}

