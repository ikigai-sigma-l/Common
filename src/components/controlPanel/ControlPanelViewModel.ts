import { UnSubscribes } from "../../observable/Observable";
import { ControlPanelView } from "./ControlPanelView";


export class ControlPanelViewModel {

    private unScribes: UnSubscribes = null

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: ControlPanelView) {
        this.release()

        this.unScribes = []
    }
}