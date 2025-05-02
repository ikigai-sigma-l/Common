import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "src/observable/Observable";
import { SettingButtonItemView } from './SettingButtonItemView';
import { SettingButtonItemModel } from './SettingButtonItemModel';

export class SettingButtonButtonViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: SettingButtonItemModel, view: SettingButtonItemView) {
        this.release()

        this.unScribes = [
            model.title.subscribe((cur) => {
                const text = view.getObject('title') as PIXI.Text
                if (text) text.text = cur
            }),
            model.icon.subscribe((cur) => {
                const sprite = view.getObject('icon') as PIXI.Sprite
                if (!sprite) return
                if (cur) sprite.texture = PIXI.Assets.get(cur)
                sprite.visible = !cur
            }),
        ]
    }
}