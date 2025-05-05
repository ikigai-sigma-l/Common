import { AnnouncementView } from './AnnouncementView'
import { AnnouncementViewModel } from './AnnouncementViewModel'

export class AnnouncementPrefab {

    private view: AnnouncementView | null = null
    private viewModel: AnnouncementViewModel | null = null

    public initial() {
        this.view = new AnnouncementView()
        this.view.initial()

        this.viewModel = new AnnouncementViewModel()
        this.viewModel?.bind(this.view)
    }

    public release() {
        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: AnnouncementView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    public position(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }
}

