import { View, Layout, Style } from '../../core/View';
import { Assets, Container, FillGradient, Graphics, Sprite, Text, TextStyle } from 'pixi.js';
import { TogglePrefab } from '../toggle/TogglePrefab';

export class SettingToggleItemView extends View {

    private toggle: TogglePrefab | null = null;;

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        this.toggle?.release()
        this.toggle = null

        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawTitle(layout)
        this.drawDescribe(layout)
        this.drawToggle(layout)
        this.drawDiv(layout)
        this.drawTouch(layout)
    }

    private addPrefab(views: View[]) {
        const parent = this.getContainer()
        if (!parent) return

        views.forEach((view) => {
            const container = view.getContainer()
            if (container) parent.addChild(container)
        })
    }

    private createObjects() {
        this.createTitle()
        this.createDescribe()
        this.createToggle()
        this.createDiv()
        this.createTouch()
    }

    private createTouch() {
        const graphic = this.createGraphic('touch')
        if (!graphic) return

        graphic.eventMode = 'static'
        graphic.cursor = 'pointer'
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
        text.anchor.set(0)
        text.position.set(0)
    }

    private createDescribe() {
        const text = this.createText('describe')
        if (!text) return
    
        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '58px',
                        fontWeight: 'normal',
                        align: 'left',
                        fill: '#9399A7',
                        wordWrap: true
                    })
        text.anchor.set(0)
        text.position.set(0)
    }

    private createToggle() {
        this.toggle = new TogglePrefab()
        this.toggle.initial()

        this.addPrefab(this.toggle.getViews())
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

    private drawTitle(layout: Layout) {
        const text = this.getObject('title') as Text
        if (!text) return

        switch(layout.style)
        {
            case Style.Portrait: 
                text.style.fontSize = 40
                text.position.set(4, 40)
                break

            case Style.MobileHorizon:
                text.style.fontSize = 40
                text.position.set(4, 40)
                break

            case Style.DesktopHorizon:
                text.style.fontSize = 20
                text.position.set(2, 24)
                break
        }
    }

    private drawDescribe(layout: Layout) {
        const text = this.getObject('describe') as Text
        if (!text) return

        switch(layout.style)
        {
            case Style.Portrait: 
                text.style.fontSize = 30
                text.style.wordWrapWidth = 692
                text.position.set(4, 92)
                break

            case Style.MobileHorizon:
                text.style.fontSize = 30
                text.style.wordWrapWidth = 660
                text.position.set(4, 91)
                break

            case Style.DesktopHorizon:
                text.style.fontSize = 16
                text.style.wordWrapWidth = 324
                text.position.set(2, 51)
                break
        }
    }

    private drawToggle(layout: Layout) {
        const toggle = this.toggle
        if (!toggle) return

        switch(layout.style)
        {
            case Style.Portrait: 
                toggle.position(716, 76)
                break

            case Style.MobileHorizon:
                toggle.position(684, 75)
                break

            case Style.DesktopHorizon:
                toggle.position(433, 43)
                break
        }

        toggle.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawDiv(layout: Layout) {
        const graphic = this.getObject('div') as Graphics
        if (!graphic) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphic.clear().moveTo(0, 145).lineTo(856, 145).stroke({ color: 0x333843, width: 1})
                break

            case Style.MobileHorizon:
                graphic.clear().moveTo(0, 143).lineTo(824, 143).stroke({ color: 0x333843, width: 1})
                break

            case Style.DesktopHorizon:
                graphic.clear().moveTo(0, 88).lineTo(496, 88).stroke({ color: 0x333843, width: 1})
                break
        }
    }

    public getToggle() {
        return this.toggle
    }
}