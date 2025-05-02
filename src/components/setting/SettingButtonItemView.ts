import { View, Layout, Style } from '../../core/View';
import { Assets, Container, FillGradient, Graphics, Sprite, Text, TextStyle } from 'pixi.js';
import { TogglePrefab } from '../toggle/TogglePrefab';

export class SettingButtonItemView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawIcon(layout)
        this.drawTitle(layout)
        this.drawDiv(layout)
        this.drawTouch(layout)
    }

    private createObjects() {
        this.createIcon()
        this.createTitle()
        this.createDiv()
        this.createTouch()
    }

    private createTouch() {
        const graphic = this.createGraphic('touch')
        if (!graphic) return

        graphic.eventMode = 'static'
        graphic.cursor = 'pointer'
    }

    private createIcon() {
        const sprite = this.createSprite('icon')
        if (!sprite) return

        sprite.anchor.set(0, 0.5)
    }

    private createTitle() {
        const text = this.createText('title')
        if (!text) return
    
        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '58px',
                        fontWeight: 'bold',
                        align: 'left',
                        fill: '#FCFCFB',
                    })
        text.anchor.set(0, 0.5)
        text.position.set(0)
    }

    private createDiv() {
        const graphic = this.createGraphic('div')
    }

    private drawTouch(layout: Layout) {
        const graphic = this.getObject('touch') as Graphics
        if (!graphic) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphic.clear().rect(0, 0, 856, 145).fill({ color: '#FFFFFF', alpha: 0 })
                break

            case Style.MobileHorizon:
                graphic.clear().rect(0, 0, 824, 143).fill({ color: '#FFFFFF', alpha: 0 })
                break

            case Style.DesktopHorizon:
                graphic.clear().rect(0, 0, 496, 88).fill({ color: '#FFFFFF', alpha: 0 })
                break
        }
    }

    private drawIcon(layout: Layout) {
        const sprite = this.getObject('icon') as Sprite
        if (!sprite) return

        switch(layout.style)
        {
            case Style.Portrait: 
                sprite.setSize(48)
                sprite.position.set(4, 72)
                break

            case Style.MobileHorizon:
                sprite.setSize(48)
                sprite.position.set(4, 72)
                break

            case Style.DesktopHorizon:
                sprite.setSize(32)
                sprite.position.set(0, 40)
                break
        }
    }

    private drawTitle(layout: Layout) {
        const text = this.getObject('title') as Text
        if (!text) return

        switch(layout.style)
        {
            case Style.Portrait: 
                text.style.fontSize = 40
                text.position.set(76, 72)
                break

            case Style.MobileHorizon:
                text.style.fontSize = 40
                text.position.set(76, 72)
                break

            case Style.DesktopHorizon:
                text.style.fontSize = 20
                text.position.set(43, 40)
                break
        }
    }

    private drawDiv(layout: Layout) {
        const graphic = this.getObject('div') as Graphics
        if (!graphic) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphic.clear().moveTo(0, 145).lineTo(856, 136).stroke({ color: 0x333843, width: 1})
                break

            case Style.MobileHorizon:
                graphic.clear().moveTo(0, 143).lineTo(824, 136).stroke({ color: 0x333843, width: 1})
                break

            case Style.DesktopHorizon:
                graphic.clear().moveTo(0, 88).lineTo(496, 80).stroke({ color: 0x333843, width: 1})
                break
        }
    }
}