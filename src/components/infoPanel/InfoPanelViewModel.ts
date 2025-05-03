import { UnSubscribes } from "src/observable/Observable";
import { InfoPanelView } from "./InfoPanelView";


export class InfoPanelViewModel {

    private unScribes: UnSubscribes = null

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: InfoPanelView) {
        this.release()

        this.unScribes = []
    }
}