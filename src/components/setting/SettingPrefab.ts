import { SettingView } from "./SettingView"
import { SettingViewModel } from "./SettingViewModel"


export class SettingPrefab {
    private view: SettingView | null = null
    private viewModel: SettingViewModel | null = null

    public initial() {
        this.release()

        this.view = new SettingView()
        this.view.initial()

        this.viewModel = new SettingViewModel()
        this.viewModel.initial()
        this.viewModel.bind(this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: SettingView[] = []
        if (this.view) list.push(this.view)
        return list
    }
}