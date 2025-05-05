import * as PIXI from 'pixi.js'
import { View, Layout, Style } from '../../../core/View';
import { Gradient } from '../../../utility/GradientUtility';

export class AttributeView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawTitle(layout)
        this.drawValue(layout)
    }

    private createObjects() {
        this.createTitle()
        this.createValue()
    } 

    private createTitle() {
        const text = this.createText('title')
        if (!text) return
        text.anchor.set(0)
        text.position.set(0, 0)

        text.style = new PIXI.TextStyle({
            fontFamily: 'UiFont',
            fontSize: '16px',
            fontWeight: 'bold',
            align: 'center',
            fill: Gradient.title,
        })
    }

    private createValue() {
        const text = this.createText('value')
        if (!text) return
        text.anchor.set(0)

        text.style = new PIXI.TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        align: 'center',
                        fill: Gradient.message,
                    })
    }

    private drawTitle(layout: Layout) {
        const text = this.getObject('title') as PIXI.Text
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.fontSize = 16
                break

            case Style.MobileHorizon:
                text.style.fontSize = 22
                break

            case Style.Portrait:
                text.style.fontSize = 22
                break
        }
    }

    private drawValue(layout: Layout) {
        const text = this.getObject('value') as PIXI.BitmapText
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.position.set(0, 21)
                text.style.fontSize = 24
                break

            case Style.MobileHorizon:
                text.position.set(0, 25)
                text.style.fontSize = 27
                break

            case Style.Portrait:
                text.position.set(0, 25)
                text.style.fontSize = 27
                break
        }
    }
}