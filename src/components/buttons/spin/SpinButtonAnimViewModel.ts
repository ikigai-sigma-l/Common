import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { SpinButtonView } from './SpinButtonView';
import { Tween } from '../../../core/Tween';
import { SpinButtonModel } from './SpinButtonModel';
import { SpinAnimState, useGameUiStore } from '../../../stores/useGameUiStore';
import { CustomEventList, CustomEventUtility } from '../../../utility/CustomEventUtility';

export class SpinButtonAnimViewModel {

    private unScribes: UnSubscribes = null

    private buttonScale = Observable<number>(1)
    private buttonRotation = Observable<number>(0)

    private idleRotationSpeed = 0.3
    private maxRotationSpeed = 8.0
    private minScale = 0.9

    private anim: Tween | null = null

    public initial() {
    }

    public release() {
        this.stopAnim()

        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: SpinButtonModel, view: SpinButtonView) {
        this.release()

        this.unScribes = [
            this.buttonScale.subscribe((state) => {
                const container = view.getContainer()
                if (container) container.scale.set(state)
            }),
            this.buttonRotation.subscribe((state) => {
                const arrow = view.getObject('arrow') as PIXI.Sprite
                if (arrow) arrow.rotation = state
            }),
            useGameUiStore.spinAnim.subscribe((state) => {
                switch(state)
                {
                    case SpinAnimState.Idle:
                        this.animStart(model)
                        break

                    case SpinAnimState.Run:
                        this.animRaise(model)
                        break

                    case SpinAnimState.Stop:
                        this.animSlow(model)
                        break
                }
            }),
        ]
    }

    private stopAnim() {
        this.anim?.stop()
        this.anim = null
      }
    
      private startAnim() {
        this.stopAnim()
        this.anim = new Tween()
        return this.anim
      }
    
      private repeatCircle(radian: number) {
        const circle = 2 * Math.PI
        if (0 < radian) {
          while (circle < radian) radian -= circle
        } else {
          while (radian < -circle) radian += circle
        }
        return radian
      }
    
      private animStart(model: SpinButtonModel) {
        const startRotation = this.repeatCircle(this.buttonRotation.get() ?? 0)
        const duration = 0.5

        model.isSpeedUp.set(false)

        this.startAnim()
          .duration(duration, (ratio) => {
            const curSpeed = this.idleRotationSpeed * ratio
            this.buttonRotation.set(startRotation + curSpeed * duration * ratio * Math.PI)
          })
          .onComplete(() => {
            this.animLoop(this.idleRotationSpeed)
          })
          .start()
      }
    
      private animLoop(speed: number) {
        const startRotation = this.repeatCircle(this.buttonRotation.get() ?? 0)
        const diff = speed * 2 * Math.PI
    
        this.startAnim()
          .duration(1, (ratio) => {
            this.buttonRotation.set(startRotation + ratio * diff)
          })
          .onComplete(() => {
            this.animLoop(speed)
          })
          .start()
      }
    
      private animRaise(model: SpinButtonModel) {
        const duration = 0.2
        const startRotation = this.repeatCircle(this.buttonRotation.get() ?? 0)
        const diffRotation = (this.idleRotationSpeed + this.maxRotationSpeed) * duration * Math.PI
        const diffScale = this.minScale - 1
    
        this.startAnim()
          .duration(duration * 0.5, (ratio) => {
            ratio = ratio * 0.5
            this.buttonScale.set(1 + Math.sin(ratio * Math.PI) * diffScale)
            this.buttonRotation.set(startRotation + ratio * diffRotation)
          })
          .call(() => {
            CustomEventUtility.dispatch(CustomEventList.PlaySpinGrow)
          })
          .duration(duration * 0.5, (ratio) => {
            ratio = 0.5 + 0.5 * ratio
            this.buttonScale.set(1 + Math.sin(ratio * Math.PI) * diffScale)
            this.buttonRotation.set(startRotation + ratio * diffRotation)
          })
          .onComplete(() => {
            model.isSpeedUp.set(true)
            this.animLoop(this.maxRotationSpeed)
          })
          .start()
      }
    
      private animSlow(model: SpinButtonModel) {
        const duration = 0.2
        const startRotation = this.repeatCircle(this.buttonRotation.get() ?? 0)
        const mov = this.idleRotationSpeed * duration * 2 * Math.PI

        model.isSpeedUp.set(false)
    
        this.startAnim()
          .duration(duration, (ratio) => {
            this.buttonRotation.set(startRotation + Math.sin(ratio * Math.PI) * mov)
          })
          .onComplete(() => {
            this.stopAnim()
          })
          .start()
      }
}