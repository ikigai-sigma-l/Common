import { AutoPlayCountButtonModel, AutoPlayCountButtonStyle } from "./AutoPlayCountButtonModel"
import { AutoPlayCountButtonView } from "./AutoPlayCountButtonView"
import { AutoPlayCountButtonViewModel } from "./AutoPlayCountButtonViewModel"

export class AutoPlayCountButtonPrefab {
    private model: AutoPlayCountButtonModel = new AutoPlayCountButtonModel()
    private view: AutoPlayCountButtonView | null = null
    private viewModel: AutoPlayCountButtonViewModel | null = null

    public initial() {
        this.release()

        this.view = new AutoPlayCountButtonView()
        this.view.initial()

        this.viewModel = new AutoPlayCountButtonViewModel()
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
        const list: AutoPlayCountButtonView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public setPlayCount(count: number) {
        this.model.count.set(count)
    }

    public getPlayCount() {
        return this.model.count.get()
    }

    public setSelect(isOn: boolean) {
        this.model.isOn.set(isOn)
    }

    public setStyle(style: AutoPlayCountButtonStyle) {
        this.model.style.set(style)
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }
}