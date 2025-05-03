import { View, Layout, Style } from '../../../core/View';

export class SpinButtonView extends View {

    public initial(): void {
        this.createObjects()
      }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {

    }

    private createObjects() {
        this.createBackground()
        this.createArrow()
        this.createIcon()
    }
    
    private createBackground() {
        const background = this.createSprite(`background`)
        if (!background) return

        background.anchor.set(0.5)
        background.position.set(0)
        background.eventMode = 'static'
        background.cursor = 'pointer'
    }

    private createArrow() {
        const arrow = this.createSprite(`arrow`)
        if (!arrow) return

        arrow.anchor.set(0.5)
        arrow.position.set(0)
    }

    private createIcon() {
        const arrow = this.createSprite(`icon`)
        if (!arrow) return

        arrow.anchor.set(0.5)
        arrow.position.set(0)
    }
}