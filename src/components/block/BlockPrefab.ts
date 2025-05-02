import { BlockView } from "./BlockView"
import { BlockViewModel } from "./BlockViewModel"

export class BlockPrefab {
    private view: BlockView | null = null
    private viewModel: BlockViewModel | null = null

    public initial() {
        this.release()

        this.view = new BlockView()
        this.view.initial()

        this.viewModel = new BlockViewModel()
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
        const list: BlockView[] = []
        if (this.view) list.push(this.view)
        return list
    }
}