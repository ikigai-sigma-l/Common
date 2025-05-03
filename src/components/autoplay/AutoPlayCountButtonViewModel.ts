import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { SpinState, useGameUiStore } from '../../stores/useGameUiStore';
import { AutoPlayCountButtonModel } from './AutoPlayCountButtonModel';
import { AutoPlayCountButtonView } from './AutoPlayCountButtonView';
import { useSettingStore } from '../../stores/useSettingStore';

export class AutoPlayCountButtonViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: AutoPlayCountButtonModel, view: AutoPlayCountButtonView) {
        this.release()

        this.unScribes = [
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const frame = view.getObject('frame') as PIXI.Graphics
                    if (frame) frame.interactive = !(cur & SpinState.AutoSpin)
                }
            ),
            model.count.subscribe(
                (cur) => {
                    const title = view.getObject('title') as PIXI.Text
                    if (title) { 
                        title.text = cur < 0 ? '∞' : cur
                    }
                }
            ),
            model.style.subscribe(
                (cur) => {
                    const frame = view.getObject('frame') as PIXI.Graphics
                    if (frame) frame.clear().roundRect(cur.width * -0.5, cur.height * -0.5, cur.width, cur.height, cur.round).fill('#333843')

                    const select = view.getObject('select') as PIXI.Graphics
                    if (select) select.clear().roundRect(cur.width * -0.5, cur.height * -0.5, cur.width, cur.height, cur.round).fill('#107D42')

                    const title = view.getObject('title') as PIXI.Text
                    if (title) title.style.fontSize = cur.fontSize
                }
            ),
            model.isOn.subscribe(
                (cur) => {
                    const select = view.getObject('select') as PIXI.Graphics
                    if (select) select.visible = cur
                }
            ),
            this.registerClickEvent(model, view)
        ]
    }
    
    private registerClickEvent(model: AutoPlayCountButtonModel, view: AutoPlayCountButtonView) {
        const frame = view.getObject('frame') as PIXI.Graphics
        if (!frame) return () => {}

        const onButtonUp = () => {
            useSettingStore.autoCount.set(model.count.get())
        }
    
        frame.on('pointerdown', this.onButtonDown.bind(this))
    
        frame.on('pointerup', onButtonUp)
    
        return () => {
            frame.off('pointerdown')
            frame.off('pointerup')
        }
    }
    
    private onButtonDown() {
    }
}