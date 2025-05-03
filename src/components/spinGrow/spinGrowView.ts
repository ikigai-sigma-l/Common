import { Spine } from '@esotericsoftware/spine-pixi-v8';
import { View, Layout, Style } from '../../core/View';

export class SpinGrowView extends View {

    public initial(): void {
        this.createObjects()
      }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawGrowSpine(layout.style)
    }

    private createObjects() {
        this.createGrowSpine()
    }
    
    private createGrowSpine() {
        const spine = this.createSpine(`spinGrow`, 'common/spine/spinButtonGlow/Spin_glow_anim.json', 'common/spine/spinButtonGlow/Spin_glow_anim.atlas', 1)
        if (!spine) return

        spine.position.set(0)
        spine.state.timeScale = 1.35
    }

    private drawGrowSpine(style: Style) {
        const spine = this.getObject(`spinGrow`) as Spine
        if (!spine) return

        switch(style)
        {
            case Style.DesktopHorizon:
                spine.scale.set(0.8)
                break

            default:
                spine.scale.set(1.1)
                break
        }
    }
}