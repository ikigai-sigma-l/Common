import { language } from '../../utility/Language';
import { View, Layout, Style } from '../../core/View';
import { TextStyle } from 'pixi.js';
import { Gradient } from '../../utility/GradientUtility';

export class AutoPlayConfirmButtonView extends View {

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
        this.createTitle()
    }

    private createFrame() {
        const graphics = this.createGraphic('frame')
        if (!graphics) return

        graphics.eventMode = 'static'
        graphics.cursor = 'pointer'
    }

    private createTitle() {
        const text = this.createText('title')
        if (!text) return

        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '22px',
                        lineHeight: 24,
                        fontWeight: 'bold',
                        align: 'center',
                        fill: Gradient.confirmBtn,
                    })
        text.text = language.text('AUTO_SPIN_CONFIRM')
        text.anchor.set(0.5)
        text.position.set(0)
        text.eventMode = 'none'
    }
}