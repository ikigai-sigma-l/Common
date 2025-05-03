import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { SpinState, useGameUiStore } from '../../stores/useGameUiStore';
import { PopUpState, usePopUpStore } from '../../stores/usePopUpStore';
import { AutoPlayConfirmButtonView } from './AutoPlayConfirmButtonView';
import { useSettingStore } from '../../stores/useSettingStore';
import { AutoPlayConfirmButtonModel } from './AutoPlayConfirmButtonModel';
import { language } from '../../utility/Language';
import { useActiveResultStore } from '../../stores/useActiveResultStore';
import { CustomEventList, CustomEventUtility } from '../../utility/CustomEventUtility';

export class AutoPlayConfirmButtonViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: AutoPlayConfirmButtonModel, view: AutoPlayConfirmButtonView) {
        this.release()

        this.unScribes = [
            model.style.subscribe(
                (cur) => {
                    const frame = view.getObject('frame') as PIXI.Graphics
                    if (frame) frame.clear().roundRect(cur.width * -0.5, cur.height * -0.5, cur.width, cur.height, cur.round).fill('#107D42').stroke({color: '#FFFFFF', width: cur.border })

                    const text = view.getObject('title') as PIXI.Text
                    if (text) text.style.fontSize = cur.fontSize
                }
            ),
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const frame = view.getObject('frame') as PIXI.Graphics
                    if (frame) frame.interactive = !(cur & SpinState.AutoSpin)
                }
            ),
            this.registerLocalization(view),
            this.registerClickEvent(view)
        ]
    }

    private registerLocalization(view: AutoPlayConfirmButtonView) {
        const refresh = () => {
            const title = view.getObject('title') as PIXI.Text
            if (title) {
                title.text = language.text('AUTO_SPIN_CONFIRM')
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
    
    private registerClickEvent(view: AutoPlayConfirmButtonView) {
        const frame = view.getObject('frame') as PIXI.Graphics
        if (!frame) return () => {}

        const onButtonUp = () => {
            usePopUpStore.current.set(PopUpState.None)
            useGameUiStore.autoSpinLeft.set(useSettingStore.autoCount.get())
            useGameUiStore.spinState.set(useGameUiStore.spinState.get() | SpinState.AutoSpin)
            CustomEventUtility.dispatch(CustomEventList.SendBet)
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