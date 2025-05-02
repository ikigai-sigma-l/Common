import * as PIXI from 'pixi.js'
import { Assets } from 'pixi.js';
import { View, Layout, Style } from '../../../core/View';

export class SpinMaskButtonView extends View {

    public initial(): void {
        this.createObjects()
      }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawMessage(layout)
    }

    private createObjects() {
        this.createBackground()
        this.createMessage()
    }
    
    private createBackground() {
        const turboMask = this.createSprite(`turboMask`)
        if (!turboMask) return

        turboMask.texture = Assets.get('turboMask.png')
        turboMask.anchor.set(0.5)
        turboMask.position.set(0)
        turboMask.eventMode = 'none'
    }

    private createMessage() {
        const text = this.createText('message')
        if (!text) return
        text.anchor.set(0.5)
        text.position.set(0, 32)

        text.style = new PIXI.TextStyle({
                                fontFamily: 'UiFont',
                                fontSize: '27px',
                                fontWeight: 'bold',
                                align: 'center',
                                fill: '#FFFFFF',
                                wordWrap: true,
                                breakWords: true,
                            })
    }

    private drawMessage(layout: Layout) {
        const text = this.getObject('message') as PIXI.Text
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.wordWrapWidth = 128
                text.style.fontSize = '21px'
                break

            case Style.MobileHorizon:
                text.style.wordWrapWidth = 174
                text.style.fontSize = '27px'
                break

            case Style.Portrait:
                text.style.wordWrapWidth = 174
                text.style.fontSize = '27px'
                break
        }
    }
}