import { View, Layout, Style } from '../../core/View';
import { Assets, Graphics, Sprite } from 'pixi.js';

export class BlockView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBlock(layout)
    }

    private createObjects() {
        this.createBlock()
    }

    private createBlock() {
        const graphics = this.createGraphic('block')
        if (!graphics) return

        graphics.eventMode = 'static'
    }

    private drawBlock(layout: Layout) {
        const graphics = this.getObject('block') as Graphics
        if (!graphics) return;

        graphics.clear().rect(0, 0, layout.width + layout.paddingX * 2, layout.height + layout.paddingY * 2).fill({
            color: 0x000000,
            alpha: 0.5,
        })
    }
}