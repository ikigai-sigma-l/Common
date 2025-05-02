import { Graphics } from "pixi.js"
import { SettingToggleItemModel } from "./SettingToggleItemModel"
import { SettingToggleItemView } from "./SettingToggleItemView"
import { SettingToggleItemViewModel } from "./SettingToggleItemViewModel"



export class SettingToggleItemPrefab {
    private model: SettingToggleItemModel = new SettingToggleItemModel()
    private view: SettingToggleItemView | null = null
    private viewModel: SettingToggleItemViewModel | null = null

    public initial() {
        this.release()

        this.view = new SettingToggleItemView()
        this.view.initial()

        this.viewModel = new SettingToggleItemViewModel()
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
        const list: SettingToggleItemView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public title(text: string) {
        this.model.title.set(text)
    }

    public describe(text: string) {
        this.model.describe.set(text)
    }

    public enable(isEnable: boolean) {
        this.model.enable.set(isEnable)
    }

    public container() {
        return this.view?.getContainer()
    }

    public touch() {
        return this.view?.getObject('touch') as Graphics
    }
}