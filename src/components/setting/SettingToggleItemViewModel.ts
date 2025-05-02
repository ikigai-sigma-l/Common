import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "src/observable/Observable";
import { SettingToggleItemView } from './SettingToggleItemView';
import { SettingToggleItemModel } from './SettingToggleItemModel';

export class SettingToggleItemViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: SettingToggleItemModel, view: SettingToggleItemView) {
        this.release()

        this.unScribes = [
            model.title.subscribe((cur) => {
                const text = view.getObject('title') as PIXI.Text
                if (text) text.text = cur
            }),
            model.describe.subscribe((cur) => {
                const text = view.getObject('describe') as PIXI.Text
                if (text) text.text = cur
            }),
            model.enable.subscribe((cur) => {
                const toggle = view.getToggle()
                if (toggle) toggle.enable(cur)
            }),
        ]
    }
}