import { AutoPlayGroupButtonView } from "./AutoPlayGroupButtonView"


export class AutoPlayGroupButtonPrefab {
    private view: AutoPlayGroupButtonView | null = null

    public initial() {
        this.release()

        this.view = new AutoPlayGroupButtonView()
        this.view.initial()
    }

    public release() {
        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: AutoPlayGroupButtonView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }

    public visible(isVisible: boolean) {
        const container = this.view?.getContainer()
        if (container) container.visible = isVisible
    }
}