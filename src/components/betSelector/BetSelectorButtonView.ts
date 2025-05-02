import { View, Layout, Style } from '../../core/View';
import { Assets, Graphics, Sprite, TextStyle, FillGradient, Text } from 'pixi.js';

export class BetSelectorButtonView extends View {

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
        this.createBetValue()
        this.createCurrencyCode()
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

    private createBetValue() {
        const text = this.createText('betValue')
        if (!text) return

        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '33px',
                        fontWeight: 'bold',
                        align: 'center',
                        fill: '#FFFFFF',
                    })
        text.text = '0.2'
        text.anchor.set(0, 0.5)
        text.position.set(0)   
        text.eventMode = 'none'
    }

    private createCurrencyCode() {
        const text = this.createText('code')
        if (!text) return

        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '26px',
                        fontWeight: 'bold',
                        align: 'center',
                        fill: '#FFFFFF',
                    })
        text.text = 'USD'
        text.anchor.set(0, 0.5)
        text.position.set(0)   
        text.eventMode = 'none'
    }
}