import { View, Layout, Style } from '../../core/View';
import { Assets, Graphics, Sprite, TextStyle, FillGradient } from 'pixi.js';

export class BetSelectorListView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
    }

    private createObjects() {
    }
}