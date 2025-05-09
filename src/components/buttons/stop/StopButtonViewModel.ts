import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinAnimState, SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { CustomEventList, CustomEventUtility } from '../../../utility/CustomEventUtility';
import { ButtonState, ButtonView, getStateName } from '../ButtonView';

export class StopButtonViewModel {

    private state = Observable<ButtonState>(ButtonState.Normal)
        
    private skinName = Observable<string>('')

    private interactive = Observable<boolean>(false)

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
                    this.setSkin(view, this.skinName.get(), cur)
                }
            ),
            this.skinName.subscribe(
                (cur) => {
                    this.setSkin(view, cur, this.state.get())
                }
            ),
            this.interactive.subscribe(
                (cur) => {
                    const background = view.getObject('background') as PIXI.Sprite
                    if (background) background.cursor = cur ? 'pointer' : 'none'
                }
            ),
            useGameUiStore.stopEnable.subscribe(
                (cur) => {
                    this.interactive.set(cur)
                    if (cur) {
                        this.skinName.set(`stop`)
                        this.state.set(ButtonState.Normal)
                    }
                    else {
                        this.skinName.set(`icon`)
                        this.state.set(ButtonState.Disable)
                    }
                }
            ),
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const container = view.getContainer()
                    if (container) container.visible = ((cur & (SpinState.AutoSpin | SpinState.FreeSpin)) == SpinState.None)
                }
            ),
            useGameUiStore.spinAnim.subscribe(
                (cur) => {
                    const background = view.getObject('background') as PIXI.Sprite
                    if (background) background.visible = (cur === SpinAnimState.Run)
                }
            ),
            this.registerClickEvent(view),
        ]
    }

    private registerClickEvent(view: ButtonView) {
        const sprite = view.getObject('background') as PIXI.Sprite
        if (!sprite) return () => {}

        sprite.on('pointerdown', this.onSpinDown.bind(this))

        sprite.on('pointerup', this.onSpinUp.bind(this))

        return () => {
            sprite.off('pointerdown')
            sprite.off('pointerup')
        }
    }

    private setSkin(view: ButtonView, name: string, state: ButtonState) {
        if (!name ) return
        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture = PIXI.Assets.get(`spinButton/${name}_${getStateName(state)}.png`)
    }

    private onSpinDown() {
    }

    private onSpinUp() {
        if (this.interactive.get() == false) return
        CustomEventUtility.dispatch(CustomEventList.StopSpinImmediately)
    }
}