import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { useTimerStore } from '../../stores/useTimerStore';
import { SpinGrowView } from './spinGrowView';
import { CustomEventList, CustomEventUtility } from '../../utility/CustomEventUtility';
import { AnimationStateListener, Spine } from '@esotericsoftware/spine-pixi-v8';

export class SpinGrowViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: SpinGrowView) {
        this.release()

        this.unScribes = [
            useTimerStore.subscribe(
                (cur) => {
                    const delta = cur.delta
                    const spine = view.getObject('spinGrow') as Spine
                    if(spine?.visible) spine.update(delta)
                }
            ),
            this.registerAnimationEvent(view),
            this.registerTriggerEvent(view),
        ]
    }

    private registerAnimationEvent(view: SpinGrowView) {
        const spine = view.getObject('spinGrow') as Spine
        if (!spine) return () => {}

        const listener = {
            complete: () => {
                spine.state.setEmptyAnimation(0, 0)
                spine.visible = false
            },
        } as AnimationStateListener

        spine.state.addListener(listener)

        return () => {
            spine.state.removeListener(listener)
        }
    }

    private registerTriggerEvent(view: SpinGrowView) {
        const playSpine = () => {
            const spine = view.getObject('spinGrow') as Spine
            if (!spine) return
            spine.visible = true
            spine.state.setAnimation(0, 'Spin_glow_anim', false)
        }

        CustomEventUtility.addEvent(CustomEventList.PlaySpinGrow, playSpine)

        return () => {
            CustomEventUtility.removeEvent(CustomEventList.PlaySpinGrow, playSpine)
        }
    }
}