import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { StopButtonView } from './StopButtonView';
import { useTimerStore } from '../../../stores/useTimerStore';
import { Spine } from '@esotericsoftware/spine-pixi-v8';

export class StopButtonViewModel {

    private isVisible = Observable<boolean>(false)

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: StopButtonView) {
        this.release()

        this.unScribes = [
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    if ((cur & (SpinState.AutoSpin | SpinState.FreeSpin | SpinState.TurboSpin | SpinState.MiniGame)) != SpinState.None) {
                        this.isVisible.set(false)
                    }
                    else if ((cur & SpinState.NormalSpin) == SpinState.None) {
                        this.isVisible.set(false)
                    }
                    else {
                        this.isVisible.set(true)
                    }
                }
            ),
            this.isVisible.subscribe(
                (cur) => {
                    const container = view.getContainer()
                    if (container) container.visible = cur

                    const spine = view.getObject('SpinGrow') as Spine
                    if (spine) {
                        if (cur) spine.state.setAnimation(0, 'Spin_glow_anim', false)
                        else spine.state.setEmptyAnimation(0, 0)
                    }

                    view.getWheel()?.run(cur)
                }
            ),
            useTimerStore.subscribe(
                (cur) => {
                    if (this.isVisible.get() == false) return
                    const delta = cur.delta
                    const spine = view.getObject('SpinGrow') as Spine
                    if(spine) spine.update(delta)
                }
            ),
            this.registerClickEvent(view),
        ]
    }

    private registerClickEvent(view: StopButtonView) {
        const sprite = view.getObject('icon') as PIXI.Sprite
        if (!sprite) return () => {}

        sprite.on('pointerdown', this.onSpinDown.bind(this))

        sprite.on('pointerup', this.onSpinUp.bind(this))

        return () => {
            sprite.off('pointerdown')
            sprite.off('pointerup')
        }
    }

    private onSpinDown() {
    }

    private onSpinUp() {
        // TO DO: call custom event here
    }
}