import * as PIXI from 'pixi.js'
import { BottomBarView } from './BottomBarView'


export class BottomBarPrefab {

    private view: BottomBarView | null = null

    public initial() {
        this.view = new BottomBarView()
        this.view.initial()
    }

    public release() {
        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: BottomBarView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }
}

