import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { PopUpState, usePopUpStore } from '../../../stores/usePopUpStore';
import { useSettingStore } from '../../../stores/useSettingStore';
import { useTimerStore } from '../../../stores/useTimerStore';
import { SpinButtonView} from './SpinButtonView';
import { SpinButtonModel, SpinButtonState } from './SpinButtonModel';

export class SpinButtonViewModel {

    private unScribes: UnSubscribes = null

    private isIdle: boolean = true

    private holdTime: number = 0

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: SpinButtonModel, view: SpinButtonView) {
        this.release()

        this.unScribes = [
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const container = view.getContainer()
                    if (container) container.visible = ((cur & (SpinState.AutoSpin | SpinState.FreeSpin | SpinState.NormalSpin)) == SpinState.None)

                    this.isIdle = cur === SpinState.None
                }
            ),
            model.state.subscribe(
                (cur) => {
                    this.setSkin(view, cur)
                }
            ),
            useTimerStore.subscribe(
                (state) => state.currentMs,
                (cur) => {
                    if (this.holdTime == 0) return
                    if (500 < cur - this.holdTime) {
                        this.turboSpin()
                    }
                },
            ),
            this.registerMouseHoverEvent(model, view),
            this.registerClickEvent(view),
        ]
    }

    private registerMouseHoverEvent(model: SpinButtonModel, view: SpinButtonView) {
        const background = view.getObject('background') as PIXI.Sprite
        if (!background) return () => {}

        background.on('mouseover', () => {
            model.state.set(SpinButtonState.Focus)
        })

        background.on('mouseout', () => {
            model.state.set(SpinButtonState.Normal)
        })

        return () => {
            background.off('mouseover')
            background.off('mouseout')
        }
    }

    private registerClickEvent(view: SpinButtonView) {
        const background = view.getObject('background') as PIXI.Sprite
        if (!background) return () => {}

        background.on('pointerdown', this.onSpinDown.bind(this))

        background.on('pointerup', this.onSpinUp.bind(this))

        return () => {
            background.off('pointerdown')
            background.off('pointerup')
        }
    }

    private getStateName(state: SpinButtonState) {
        switch(state)
        {
            case SpinButtonState.Normal: return 'normal' 
            case SpinButtonState.Focus: return 'focus'
            case SpinButtonState.Push: return 'push'
            case SpinButtonState.Disable: return 'disable'
        }
    }

    private setSkin(view: SpinButtonView, state: SpinButtonState) {
        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture = PIXI.Assets.get(`spinButton/spin_${this.getStateName(state)}.png`)

        const arrow = view.getObject('arrow') as PIXI.Sprite
        if (arrow) arrow.texture = PIXI.Assets.get(`spinButton/arrow_${this.getStateName(state)}.png`)

        const icon = view.getObject('icon') as PIXI.Sprite
        if (icon) icon.texture = PIXI.Assets.get(`spinButton/icon_${this.getStateName(state)}.png`)
    }

    private onSpinDown() {
        if (!this.isIdle) return
        this.holdTime = useTimerStore.getState().currentMs
    }

    private onSpinUp() {
        if (!this.isIdle) return
        if (usePopUpStore.current.get() == PopUpState.AutoPlay) {
            useGameUiStore.autoSpinLeft.set(useSettingStore.autoCount.get())
            useGameUiStore.spinState.set(useGameUiStore.spinState.get() | SpinState.AutoSpin)
        }
        this.sendBet()
    }

    private turboSpin() {
        if (!this.isIdle) return
        useGameUiStore.autoSpinLeft.set(-1)
        useGameUiStore.spinState.set(useGameUiStore.spinState.get() | SpinState.AutoSpin | SpinState.TurboSpin)
        this.sendBet()
    }

    private sendBet() {
        this.holdTime = 0
        // TODO: cal custom event here
    }
}