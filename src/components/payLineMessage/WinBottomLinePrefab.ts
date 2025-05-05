import { UnSubscribes } from "../../observable/Observable";
import { WinBottomLineView } from "./WinBottomLineView";
import { WinBottomLineViewModel } from "./WinBottomLineViewModel";

export class WinBottomLinePrefab {
    private view: WinBottomLineView | null = null
    private viewModel: WinBottomLineViewModel | null = null;;

    private unSubscribes: UnSubscribes = null

    public initial() {
        this.release()

        this.view = new WinBottomLineView()
        this.view.initial()

        this.viewModel = new WinBottomLineViewModel()
        this.viewModel.initial()
        this.viewModel.bind(this.view)

        this.observer()
    }

    public release() {
        this.unObserver()

        this.viewModel?.release()
        this.viewModel = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: WinBottomLineView[] = []
        if (this.view) list.push(this.view)
        return list
    }

    private observer() {
        this.unSubscribes = [
        ]
    }
    
    private unObserver() {
        this.unSubscribes?.forEach((subscribe) => {
          if (subscribe) subscribe()
        })
        this.unSubscribes = null
    }

    public setPosition(x: number, y: number) {
        const container = this.view?.getContainer()
        if (container) container.position.set(x, y)
    }
}