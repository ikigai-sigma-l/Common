import * as PIXI from 'pixi.js'
import { View, Layout, Style } from '../../core/View';
import { Gradient } from '../../utility/GradientUtility';

export class MessageView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawMessageFrame(layout)
        this.drawMessageText(layout)
        this.drawFrame()
    }

    private createObjects() {
        this.createMessageFrame()
        this.createMessageText()
    } 

    private createMessageFrame() {
        this.createGraphic('frame')
    }

    private createMessageText() {
        const text = this.createText('text') as PIXI.Text
        if (!text) return
        
        text.anchor.set(0.5)
        text.position.set(0)
        
        text.style = new PIXI.TextStyle({
            fontFamily: 'UiFont',
            fontSize: '50px',
            fontWeight: 'bold',
            align: 'center',
            fill: Gradient.message,
        })
    }

    private drawMessageFrame(layout: Layout) {
        const graphic = this.getObject('frame') as PIXI.Graphics
        if (graphic) graphic.visible = layout.style === Style.Portrait
    }

    private drawMessageText(layout: Layout) {
        const text = this.getObject('text') as PIXI.Text
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.fontSize = '50px'
                break

            case Style.MobileHorizon:
                text.style.fontSize = '40px'
                break

            case Style.Portrait:
                text.style.fontSize = '48px'
                break
        }
    }

    public drawFrame() {
        const frame = this.getObject('frame') as PIXI.Graphics
        if (!frame) return

        const sprite = this.getObject('text') as PIXI.Sprite
        
        const border = 57
        const padding = 16
        const width = (sprite?.width ?? 0) + padding * 2
        const height = (sprite?.height ?? 0) + padding * 2
                
        frame.clear().roundRect(width * -0.5, height * -0.5, width, height, border).fill({
            color: 0x151a25,
            alpha: 0.5,
        })
    }
}