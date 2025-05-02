import * as PIXI from 'pixi.js'
import { UnSubscribes } from "../../../observable/Observable";
import { Tween } from '../../../core/Tween';
import { StopWheelModel } from './StopWheelModel';
import { StopWheelView } from './StopWheelView';

export class StopWheelViewModel {

    private unScribes: UnSubscribes = null

    private anim: (() => void) | null = null

    public initial() {
    }

    public release() {
        this.stopAnim()

        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: StopWheelModel, view: StopWheelView) {
        this.release()

        this.unScribes = [
            model.isRun.subscribe(
                (cur) => {
                    if (cur == true) {
                        this.createSpinAnimation(view)
                    }
                    else {
                        this.stopAnim()
                    }
                }
            ),
        ]
    }

    private stopAnim() {
        if (this.anim) this.anim()
        this.anim = null
    }

    private animateScale(target: PIXI.Container, ratio: number, fromScale: number, toScale: number) {
        const easeRatio = 1 - Math.pow(1 - ratio, 2)
        const currentScale = fromScale + (toScale - fromScale) * easeRatio
        target.scale.set(currentScale)
        return easeRatio
    }

    private createSpinAnimation(view: StopWheelView) {
        this.stopAnim()

        const container = view.getContainer()
        if (!container) return

        const originalScale = 1
        const scaleTarget = originalScale - 0.1
        const duration = 0.2
        const delayTime = 0.1
        const rotateTimes = 2

        this.anim = new Tween()
            .duration(duration, (ratio) => {
                const easeRatio = this.animateScale(container, ratio, originalScale, scaleTarget)
                container.rotation = Math.PI * rotateTimes * easeRatio
            })
            .duration(duration, (ratio) => {
                const easeRatio = this.animateScale(container, ratio, scaleTarget, originalScale)
                container.rotation = Math.PI * rotateTimes + Math.PI * rotateTimes * easeRatio
            })
            .delay(delayTime)
            .onComplete(() => {
                this.createSpinAnimation(view)
            })
            .onSkip(() => {
                container.scale.set(1)
                container.rotation = 0
            })
            .start()
    }
}