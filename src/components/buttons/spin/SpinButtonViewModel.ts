import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { ButtonState, ButtonView, getStateName } from '../ButtonView';
import { PopUpState, usePopUpStore } from '../../../stores/usePopUpStore';
import { useSettingStore } from '../../../stores/useSettingStore';
import { useTimerStore } from '../../../stores/useTimerStore';

export class SpinButtonViewModel {

    private state = Observable<ButtonState>(ButtonState.Normal)
        
    private skinName = Observable<string>('letsgo')

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

    public bind(view: ButtonView) {
        this.release()

        this.unScribes = [
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const container = view.getContainer()
                    if (container) container.visible = ((cur & (SpinState.AutoSpin | SpinState.FreeSpin | SpinState.NormalSpin)) == SpinState.None)

                    this.isIdle = cur === SpinState.None
                }
            ),
            this.state.subscribe(
                (cur) => {
                    this.setSkin(view, this.skinName.get(), cur)
                }
            ),
            this.skinName.subscribe(
                (cur) => {
                    this.setSkin(view, cur, this.state.get())
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

        background.on('pointerdown', this.onSpinDown.bind(this))

        background.on('pointerup', this.onSpinUp.bind(this))

        return () => {
            background.off('pointerdown')
            background.off('pointerup')
        }
    }

    private setSkin(view: ButtonView, name: string, state: ButtonState) {
        if (!name ) return
        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture = PIXI.Assets.get(`${name}-${getStateName(state)}.png`)
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