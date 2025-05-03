import * as PIXI from 'pixi.js'
import { View, Layout, Style } from '../../core/View';

export class TimerView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawTime(layout)
        this.drawFrame()
    }

    private createObjects() {
        this.createFrame()
        this.createTime()
    } 

    private createFrame() {
        this.createGraphic('frame')
    }

    private createTime() {
        const text = this.createText('time')
        if (!text) return

        text.style = new PIXI.TextStyle({
            fontFamily: 'UiFont',
            fontSize: `18px`,
            fontWeight: 'normal',
            lineHeight: 16.9, // 18 * 0.9384
            letterSpacing: -0.03,
            align: 'center',
            fill: '#FFFFFF',
        })
        text.anchor.set(0.5)
    }

    private drawTime(layout: Layout) {
        const text = this.getObject('time') as PIXI.Text
        if (!text) return
        
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.fontSize = 18
                text.style.lineHeight = 16.9 // 18 * 0.9384
                break
        
            case Style.MobileHorizon:
                text.style.fontSize = 26
                text.style.lineHeight = 24.4 // 26 * 0.9384
                break
        
            case Style.Portrait:
                text.style.fontSize = 26
                text.style.lineHeight = 24.4 // 26 * 0.9384
                break
        }
    }

    public drawFrame() {
        const frame = this.getObject('frame') as PIXI.Graphics
        if (!frame) return

        const text = this.getObject('time') as PIXI.Text
        
        const border = 8
        const padding = 8
        const width = (text?.width ?? 0) + padding * 2
        const height = (text?.height ?? 0) + padding * 2
        
        frame.clear().roundRect(width * -0.5, height * -0.5, width, height, border).fill({
            color: 0x151a25,
            alpha: 0.5,
        })
    }
}