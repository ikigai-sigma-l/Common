import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "src/observable/Observable";
import { useSettingStore } from 'src/stores/useSettingStore';
import { ToggleView } from './ToggleView';
import { ToggleModel } from './ToggleModel';

export class ToggleViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: ToggleModel, view: ToggleView) {
        this.release()

        this.unScribes = [
            model.enable.subscribe((cur) => {
                const fill = view.getObject('fill') as PIXI.Graphics
                if (fill) fill.visible = cur

                const close = view.getObject('close') as PIXI.Graphics
                if (close) close.visible = !cur

                const open = view.getObject('open') as PIXI.Graphics
                if (open) open.visible = cur
            })
        ]
    }
}