import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { PopUpState, usePopUpStore } from '../../stores/usePopUpStore';

import { useSettingStore } from '../../stores/useSettingStore';
import { BetSelectorView } from './BetSelectorView';
import { language } from '../../utility/Language';
import { useActiveResultStore } from '../../stores/useActiveResultStore';

export class BetSelectorViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: BetSelectorView) {
        this.release()

        this.unScribes = [
            this.registerLocalization(view),
            this.registerClickEvent(view)
        ]
    }

    private registerLocalization(view: BetSelectorView) {
        const refresh = () => {
            const title = view.getObject('title') as PIXI.Text
            if (title) {
                title.text = language.text('BET_SELECT_THE_BET')
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

    private registerClickEvent(view: BetSelectorView) {
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