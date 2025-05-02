import { BetSelectorButtonModel, ButtonStyle } from "./BetSelectorButtonModel"
import { BetSelectorButtonView } from "./BetSelectorButtonView"
import { BetSelectorButtonViewModel } from "./BetSelectorButtonViewModel"


export class BetSelectorButtonPrefab {
    private model: BetSelectorButtonModel = new BetSelectorButtonModel()
    private view: BetSelectorButtonView | null = null
    private viewModel: BetSelectorButtonViewModel | null = null

    public initial() {
        this.release()

        this.view = new BetSelectorButtonView()
        this.view.initial()

        this.viewModel = new BetSelectorButtonViewModel()
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
        const list: BetSelectorButtonView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public setBetValue(val: number) {
        this.model.betValue.set(val)
    }

    public getBetValue() {
        return this.model.betValue.get()
    }

    public setSelect(isOn: boolean) {
        this.model.isOn.set(isOn)
    }

    public setStyle(style: ButtonStyle) {
        this.model.style.set(style)
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }
}