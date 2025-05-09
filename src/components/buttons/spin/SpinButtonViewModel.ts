import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinAnimState, SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { PopUpState, usePopUpStore } from '../../../stores/usePopUpStore';
import { useSettingStore } from '../../../stores/useSettingStore';
import { useTimerStore } from '../../../stores/useTimerStore';
import { SpinButtonView} from './SpinButtonView';
import { SpinButtonModel, SpinButtonState } from './SpinButtonModel';
import { CustomEventList, CustomEventUtility } from '../../../utility/CustomEventUtility';

enum SpinStateFlag {
    Normal = 0,
    Focus = 1 << 0,
    Push = 1 << 1,
    Disable = 1 << 2,
    Run = 1 << 3,
}

export class SpinButtonViewModel {

    private unScribes: UnSubscribes = null

    private stateFlag = Observable<number>(SpinStateFlag.Normal)

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
                    if (container) container.visible = ((cur & (SpinState.AutoSpin | SpinState.FreeSpin)) == SpinState.None)

                    const icon = view.getObject('icon') as PIXI.Sprite
                    if (icon) icon.visible = ((cur & (SpinState.NormalSpin)) == SpinState.None)

                    this.isIdle = cur === SpinState.None
                }
            ),
            model.state.subscribe(
                (cur) => {
                    let flag = this.stateFlag.get()
                    flag &= SpinStateFlag.Run
                    switch(cur)
                    {
                        case SpinButtonState.Normal:
                            flag |= SpinStateFlag.Normal
                            break
                        case SpinButtonState.Focus:
                            flag |= SpinStateFlag.Focus
                            break
                        case SpinButtonState.Push:
                            flag |= SpinStateFlag.Push
                            break
                        case SpinButtonState.Disable:
                            flag |= SpinStateFlag.Disable
                            break
                    }
                    this.stateFlag.set(flag)
                }
            ),
            useGameUiStore.spinAnim.subscribe(
                (cur) => {
                    let flag = this.stateFlag.get()
                    flag &= ~SpinStateFlag.Run
                    if (cur === SpinAnimState.Run) flag |= SpinStateFlag.Run
                    this.stateFlag.set(flag)
                }
            ),
            this.stateFlag.subscribe(
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

    private setSkin(view: SpinButtonView, flag: SpinStateFlag) {
        const { isRun, state } = this.parseFlag(flag) 

        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture = PIXI.Assets.get(`spinButton/spin_${this.getStateName(state)}.png`)

        const arrow = view.getObject('arrow') as PIXI.Sprite
        if (arrow) {
            if (isRun) arrow.texture = PIXI.Assets.get(`spinButton/arrow_run.png`)
            else arrow.texture = PIXI.Assets.get(`spinButton/arrow_${this.getStateName(state)}.png`)
        }

        const icon = view.getObject('icon') as PIXI.Sprite
        if (icon) icon.texture = PIXI.Assets.get(`spinButton/icon_${this.getStateName(state)}.png`)
    }

    private hasFlag(cur: SpinStateFlag, flag: SpinStateFlag) {
        return ((cur & flag) !== 0)
    }

    private parseFlag(flag: SpinStateFlag) {
        const isRun = this.hasFlag(flag, SpinStateFlag.Run)
        if (this.hasFlag(flag, SpinStateFlag.Disable)) return { isRun: isRun, state: SpinButtonState.Disable }
        if (this.hasFlag(flag, SpinStateFlag.Push)) return { isRun: isRun, state: SpinButtonState.Push }
        if (this.hasFlag(flag, SpinStateFlag.Focus)) return { isRun: isRun, state: SpinButtonState.Focus }
        return { isRun: isRun, state: SpinButtonState.Normal }
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
        CustomEventUtility.dispatch(CustomEventList.SendBet)
    }
}