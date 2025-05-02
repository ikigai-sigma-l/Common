import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { SpinMaskButtonView } from './SpinMaskButtonView';
import { language } from '../../../utility/Language';
import { useActiveResultStore } from '../../../stores/useActiveResultStore';


export class SpinMaskButtonViewModel {

    private isShow = Observable<boolean>(true)

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: SpinMaskButtonView) {
        this.release()

        this.unScribes = [
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    if (cur != SpinState.None) this.isShow.set(false) 
                }
            ),
            this.isShow.subscribe(
                (cur) => {
                    const container = view.getContainer()
                    if (container) container.visible = cur
                }
            ),
            this.registerLocalization(view)
        ]
    }

    private registerLocalization(view: SpinMaskButtonView) {
        const refresh = () => {
            const text = view.getObject('message') as PIXI.Text
            if (text) text.text = language.text('HOLD_FOR_TURBO_SPIN')
        }
    
        refresh()
        return useActiveResultStore.subscribe(
            (state) => state.data,
            (cur) => {
                refresh()
            }
        )
    }
}