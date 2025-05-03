import { View, Layout, Style } from '../../core/View';
import { TextStyle } from 'pixi.js';

export class AutoPlayCountButtonView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
    }

    private createObjects() {
        this.createFrame()
        this.createSelect()
        this.createTitle()
    }

    private createFrame() {
        const graphics = this.createGraphic('frame')
        if (!graphics) return

        graphics.eventMode = 'static'
        graphics.cursor = 'pointer'
    }

    private createSelect() {
        const graphics = this.createGraphic('select')
        if (!graphics) return
    }

    private createTitle() {
        const text = this.createText('title')
        if (!text) return

        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        align: 'center',
                        fill: '#FFFFFF',
                    })
        text.text = '1'
        text.anchor.set(0.5)
        text.position.set(0)

        text.eventMode = 'none'
    }
}