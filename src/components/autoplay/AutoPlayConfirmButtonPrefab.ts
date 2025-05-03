import { AutoPlayConfirmButtonView } from "./AutoPlayConfirmButtonView"
import { AutoPlayConfirmButtonViewModel } from "./AutoPlayConfirmButtonViewModel"
import { AutoPlayConfirmButtonModel, AutoPlayConfirmButtonStyle } from "./AutoPlayConfirmButtonModel"

export class AutoPlayConfirmButtonPrefab {
    private model: AutoPlayConfirmButtonModel = new AutoPlayConfirmButtonModel()
    private view: AutoPlayConfirmButtonView | null = null
    private viewModel: AutoPlayConfirmButtonViewModel | null = null

    public initial() {
        this.release()

        this.view = new AutoPlayConfirmButtonView()
        this.view.initial()

        this.viewModel = new AutoPlayConfirmButtonViewModel()
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
        const list: AutoPlayConfirmButtonView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }

    public setStyle(style: AutoPlayConfirmButtonStyle) {
        this.model.style.set(style)
    }

    public visible(isVisible: boolean) {
        const container = this.view?.getContainer()
        if (container) container.visible = isVisible
    }
}