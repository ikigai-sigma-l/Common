import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { ButtonView, ButtonState, getStateName } from '../ButtonView';
import { PopUpState, usePopUpStore } from '../../../stores/usePopUpStore';

enum AutoButtonFlag {
    AutoPlaying = 0x01,
    OpenAutoMenu = 0x02
}

export class AutoButtonViewModel {

    private state = Observable<ButtonState>(ButtonState.Normal)

    private flag = Observable<number>(0)

    private skinName = Observable<string>('')

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
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    let flag = this.flag.get()
                    const isAutoSpin = this.isAutoSpin()
                    if (isAutoSpin) flag |= AutoButtonFlag.AutoPlaying
                    else flag &= ~AutoButtonFlag.AutoPlaying

                    this.flag.set(flag)
                }
            ),
            usePopUpStore.current.subscribe(
                (cur) => {
                    let flag = this.flag.get()
                    if (cur == PopUpState.AutoPlay) flag |= AutoButtonFlag.OpenAutoMenu
                    else flag &= ~AutoButtonFlag.OpenAutoMenu

                    this.flag.set(flag)
                }
            ),
            this.state.subscribe(
                (cur) => {
                    this.setSkin(view, this.skinName.get(), cur)
                }
            ),
            this.flag.subscribe(
                (cur) => {
                    if (cur & AutoButtonFlag.OpenAutoMenu) this.skinName.set('close')
                    else if (cur & AutoButtonFlag.AutoPlaying) this.skinName.set('stop')
                    else this.skinName.set('auto')
                }
            ),
            this.skinName.subscribe(
                (cur) => {
                    this.setSkin(view, cur, this.state.get())
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

    private isAutoSpin() {
        const state = useGameUiStore.spinState.get()
        return (state & SpinState.AutoSpin) != SpinState.None
    }

    private setSkin(view: ButtonView, name: string, state: ButtonState) {
        if (!name ) return
        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture = PIXI.Assets.get(`${name}-${getStateName(state)}.png`)
    }

    private onButtonDown() {
    }

    private onButtonUp() {
        const flag = this.flag.get()
        if (flag & AutoButtonFlag.OpenAutoMenu) usePopUpStore.current.set(PopUpState.None)
        else if (flag & AutoButtonFlag.AutoPlaying) useGameUiStore.spinState.set(useGameUiStore.spinState.get() & ~SpinState.AutoSpin)
        else usePopUpStore.current.set(PopUpState.AutoPlay)
    }
}