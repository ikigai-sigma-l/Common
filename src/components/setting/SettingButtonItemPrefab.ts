import { Graphics } from "pixi.js"
import { SettingButtonItemModel } from "./SettingButtonItemModel"
import { SettingButtonItemView } from "./SettingButtonItemView"
import { SettingButtonButtonViewModel } from "./SettingButtonItemViewModel"

export class SettingButtonItemPrefab {
    private model: SettingButtonItemModel = new SettingButtonItemModel()
    private view: SettingButtonItemView | null = null
    private viewModel: SettingButtonButtonViewModel | null = null

    public initial() {
        this.release()

        this.view = new SettingButtonItemView()
        this.view.initial()

        this.viewModel = new SettingButtonButtonViewModel()
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
        const list: SettingButtonItemView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public title(text: string) {
        this.model.title.set(text)
    }

    public icon(path: string) {
        this.model.icon.set(path)
    }

    public container() {
        return this.view?.getContainer()
    }

    public touch() {
        return this.view?.getObject('touch') as Graphics
    }
}