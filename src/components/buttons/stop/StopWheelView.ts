import { Assets, Sprite } from 'pixi.js';
import { View, Layout, Style } from '../../../core/View';

export class StopWheelView extends View {

    public initial(): void {
        this.createObjects()
      }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBackground(layout)
    }

    private createObjects() {
        this.createBackground()
    }
    
    private createBackground() {
        const background = this.createSprite(`background`)
        if (!background) return

        background.texture = Assets.get('reelStop_outer.png')

        background.anchor.set(0.5)
        background.position.set(0)
    }

    private drawBackground(layout: Layout) {
        const sprite = this.getObject('background') as Sprite
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
}