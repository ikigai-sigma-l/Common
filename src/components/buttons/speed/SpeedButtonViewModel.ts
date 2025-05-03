import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { ButtonState, ButtonView, getStateName } from '../ButtonView';
import { ReelSpeed, useSettingStore } from '../../../stores/useSettingStore';

export class SpeedButtonViewModel {

    private state = Observable<ButtonState>(ButtonState.Normal)

    private speedLv = Observable<ReelSpeed>(ReelSpeed.Regular)
        
    private isInteractive = Observable<boolean>(true)
    
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
                    this.setSkin(view, this.speedLv.get(), cur)
                }
            ),
            this.speedLv.subscribe(
                (cur) => {
                    this.setSkin(view, cur, this.state.get())
                }
            ),
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    this.isInteractive.set(cur === SpinState.None)
                }
            ),
            this.isInteractive.subscribe(
                (cur) => {
                    const background = view.getObject('background') as PIXI.Sprite
                    if (background) background.interactive = cur

                    this.state.set(cur ? ButtonState.Normal : ButtonState.Disable)
                }
            ),
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const hasFlag = (state: SpinState) => {
                        return (state & cur) != 0
                    }

                    if (hasFlag(SpinState.FreeSpin)) {
                        this.speedLv.set(ReelSpeed.Regular)
                    }
                    else if (hasFlag(SpinState.TurboSpin)) {
                        this.speedLv.set(ReelSpeed.SuperFast)
                    }
                    else {
                        this.speedLv.set(useSettingStore.speedLevel.get())
                    }
                }
            ),
            useSettingStore.speedLevel.subscribe(
                (cur) => {
                    this.speedLv.set(cur)
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

        background.on('pointerup', this.onChangeSpeedLv.bind(this))

        return () => {
            background.off('pointerdown')
            background.off('pointerup')
        }
    }

    private onButtonDown() {
    }

    private onChangeSpeedLv() {
        const speedLv = useSettingStore.speedLevel.get()
        useSettingStore.speedLevel.set((speedLv + 1) % 3)
    }

    private getSpeedLv(lv: number) {
        switch(lv)
        {
            case ReelSpeed.Regular: return 'speedRegular'
            case ReelSpeed.Fast: return 'speedFast'
            default: return 'speedSuperFast'
        }
    }

    private setSkin(view: ButtonView, speed: ReelSpeed, state: ButtonState) {
        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture = PIXI.Assets.get(`${this.getSpeedLv(speed)}_${getStateName(state)}.png`)
    }
}