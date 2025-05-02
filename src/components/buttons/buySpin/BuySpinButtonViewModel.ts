import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { ButtonState, ButtonView, getStateName } from '../ButtonView';
import { PopUpState, usePopUpStore } from '../../../stores/usePopUpStore';
import { IS_OFFLINE } from '../../../types/common';

export class BuySpinButtonViewModel {

    private state = Observable<ButtonState>(ButtonState.Normal)

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: ButtonView) {
        this.release()

        this.unScribes = [
            this.state.subscribe(
                (cur) => {
                    const background = view.getObject('background') as PIXI.Sprite
                    if (!background) return
                    background.texture = PIXI.Assets.get(`buySpin-${getStateName(cur)}.png`)
                }
            ),
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const background = view.getObject('background') as PIXI.Sprite
                    if (!background) return
                    const isEnable = (cur == SpinState.None)
                    background.interactive = isEnable
                    if (isEnable == false) this.state.set(ButtonState.Disable)
                    else this.state.set(ButtonState.Normal)
                }
            ),
            this.registerMouseHoverEvent(view),
            this.registerClickEvent(view),
        ]
    }

    private registerMouseHoverEvent(view: ButtonView) {
        const background = view.getObject('background') as PIXI.Sprite
        if (!background) return () => {}

        background.on('mouseover', () => {
            this.state.set(ButtonState.Focus)
        })

        background.on('mouseout', () => {
            this.state.set(ButtonState.Normal)
        })

        return () => {
            background.off('mouseover')
            background.off('mouseout')
        }
    }

    private registerClickEvent(view: ButtonView) {
        const background = view.getObject('background') as PIXI.Sprite
        if (!background) return () => {}

        background.on('pointerdown', this.onButtonDown.bind(this))

        background.on('pointerup', this.onButtonUp.bind(this))

        return () => {
            background.off('pointerdown')
            background.off('pointerup')
        }
    }

    private onButtonDown() {
    }

    private onButtonUp() {
        // DEV Only : cheat tool
        if (IS_OFFLINE) usePopUpStore.current.set(PopUpState.CheatTool)
    }
}