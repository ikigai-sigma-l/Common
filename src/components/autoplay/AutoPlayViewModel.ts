import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { PopUpState, usePopUpStore } from '../../stores/usePopUpStore';
import { AutoPlayView } from './AutoPlayView';
import { useSettingStore } from '../../stores/useSettingStore';
import { useActiveResultStore } from '../../stores/useActiveResultStore';
import { language } from '../../utility/Language';

export class AutoPlayViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: AutoPlayView) {
        this.release()

        this.unScribes = [
            useSettingStore.autoCount.subscribe(
                (cur) => {
                    const btns = view.getList()
                    const selectIdx = Math.max(0, btns.findIndex((btn) => cur == btn.getPlayCount()))
                    btns.forEach((btn, idx) => {
                        btn.setSelect(idx == selectIdx)
                    })
                }
            ),
            this.registerLocalization(view),
            this.registerClickEvent(view)
        ]
    }

    private registerLocalization(view: AutoPlayView) {
        const refresh = () => {
            const title = view.getObject('title') as PIXI.Text
            if (title) {
                title.text = language.text('AUTO_SPIN_TITLE')
            }

            const message = view.getObject('message') as PIXI.Text
            if (message) {
                message.text = language.text('AUTO_SPIN_ROUND')
            }
        }
                
        refresh()
        return useActiveResultStore.subscribe(
            (state) => state.data,
            (cur) => {
                refresh()
            }
        )
    }

    private registerClickEvent(view: AutoPlayView) {
        const close = view.getObject('close') as PIXI.Sprite
        if (!close) return () => {}
        
        close.on('pointerdown', this.onButtonDown.bind(this))
        
        close.on('pointerup', this.onButtonUp.bind(this))
        
        return () => {
            close.off('pointerdown')
            close.off('pointerup')
        }
    }
        
    private onButtonDown() {
    }
        
    private onButtonUp() {
        usePopUpStore.current.set(PopUpState.None)
    }
}