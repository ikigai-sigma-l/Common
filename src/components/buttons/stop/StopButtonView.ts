import { Spine } from '@esotericsoftware/spine-pixi-v8';
import { Assets, Sprite } from 'pixi.js';
import { View, Layout, Style } from '../../../core/View';
import { StopWheelPrefab } from './StopWheelPrefab';

export class StopButtonView extends View {

    private wheel: StopWheelPrefab | null = null

    public initial(): void {
        this.createObjects()
      }

    public release(): void {
        this.wheel?.release()
        this.wheel = null

        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawGlowAnimation(layout)
        this.drawWheel(layout)
        this.drawIcon(layout)
    }

    private addPrefab(views: View[]) {
        const parent = this.getContainer()
        if (!parent) return

        views.forEach((view) => {
            const container = view.getContainer()
            if (container) parent.addChild(container)
        })
    }

    private createObjects() {
        this.createGlowAnimation()
        this.createWheel()
        this.createIcon()
    }

    private createGlowAnimation() {
        const spine = this.createSpine('SpinGrow', 'common/spine/spinButtonGlow/Spin_glow_anim.json', 'common/spine/spinButtonGlow/Spin_glow_anim.atlas', 1)
        if (!spine) return
        spine.state.timeScale = 1.35
    }
    
    private createWheel() {
        this.wheel = new StopWheelPrefab()
        this.wheel.initial()
        this.addPrefab(this.wheel.getViews())
    }

    private createIcon() {
        const icon = this.createSprite(`icon`)
        if (!icon) return

        icon.texture = Assets.get('reelStop_inner.png')

        icon.anchor.set(0.5)
        icon.position.set(0)
        icon.eventMode = 'static'
        icon.cursor = 'pointer'
    }

    private drawGlowAnimation(layout: Layout) {
        const spine = this.getObject('SpinGrow') as Spine
        if (!spine) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                spine.scale.set(0.8)
                break
            
            case Style.MobileHorizon:
                spine.scale.set(1.1)
                break

            case Style.Portrait:
                spine.scale.set(1.1)
                break
        }
    }

    private drawWheel(layout: Layout) {
        this.wheel?.getViews()?.forEach((view) => view.onDraw(layout))
    }

    private drawIcon(layout: Layout) {
        const sprite = this.getObject('icon') as Sprite
        if (!sprite) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                sprite.setSize(200, 200)
                break
            
            case Style.MobileHorizon:
                sprite.setSize(272, 272)
                break

            case Style.Portrait:
                sprite.setSize(272, 272)
                break
        }
    }

    public getWheel() {
        return this.wheel
    }
}