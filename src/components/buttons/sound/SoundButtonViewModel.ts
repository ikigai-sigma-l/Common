import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { ButtonState, ButtonView, getStateName } from '../ButtonView';
import { useSettingStore } from '../../../stores/useSettingStore';

export class SoundButtonViewModel {

    private state = Observable<ButtonState>(ButtonState.Normal)
    
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
            useSettingStore.isMute.subscribe(
                (cur) => {
                    this.skinName.set(cur ? 'soundOff' : 'soundOn')
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

    private setSkin(view: ButtonView, name: string, state: ButtonState) {
        if (!name ) return
        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture = PIXI.Assets.get(`${name}-${getStateName(state)}.png`)
    }

    private onButtonDown() {
    }

    private onButtonUp() {
        const isMute = useSettingStore.isMute.get()
        useSettingStore.isMute.set(!isMute)
    }
}