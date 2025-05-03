import { View, Layout, Style } from 'src/core/View';
import { Assets, Graphics, Sprite, TextStyle, FillGradient, Text } from 'pixi.js';
import { AutoPlayConfirmButtonPrefab } from './AutoPlayConfirmButtonPrefab';
import { AutoPlayCountButtonPrefab } from './AutoPlayCountButtonPrefab';
import { AutoPlayCountButtonStyle } from './AutoPlayCountButtonModel';
import { AutoPlayGroupButtonPrefab } from './AutoPlayGroupButtonPrefab';
import { Gradient } from '../../utility/GradientUtility';

export class AutoPlayView extends View {

    private buttons: AutoPlayCountButtonPrefab[] = []
    private confirm: AutoPlayConfirmButtonPrefab | null = null
    private spinGroup: AutoPlayGroupButtonPrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        this.spinGroup?.release()
        this.spinGroup = null

        this.confirm?.release()
        this.confirm = null

        this.buttons.forEach((btn) => btn.release())
        this.buttons = []

        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawContainer(layout)
        this.drawFrame(layout)
        this.drawClose(layout)
        this.drawTitle(layout)
        this.drawLine(layout)
        this.drawMessage(layout)
        this.drawButtons(layout)
        this.drawConfirm(layout)
        this.drawSpin(layout)
    }

    private createObjects() {
        this.createFrame()
        this.createClose()
        this.createTitle()
        this.createLine()
        this.createMessage()
        this.createButtons()
        this.createConfirm()
        this.createSpin()
    }

    private addPrefab(views: View[]) {
        const parent = this.getContainer()
        if (!parent) return

        views.forEach((view) => {
            const container = view.getContainer()
            if (container) parent.addChild(container)
        })
    }

    private createFrame() {
        const graphics = this.createGraphic('frame')
        if (!graphics) return
    }

    private createClose() {
        const sprite = this.createSprite('close')
        if (!sprite) return

        sprite.texture = Assets.get('close_normal.png')
        sprite.anchor.set(1,0)
        sprite.eventMode = 'static'
        sprite.cursor = 'pointer'
    }

    private createTitle() {
        const text = this.createText('title')
        if (!text) return

        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        align: 'left',
                        fill: Gradient.popUpTitle,
                    })
        text.text = 'AUTOPLAY'
        text.anchor.set(0, 0)
    }

    private createLine() {
        const graphics = this.createGraphic('line')
        if (!graphics) return
    }

    private createMessage() {
        const text = this.createText('message')
        if (!text) return

        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '18px',
                        fontWeight: 'normal',
                        align: 'left',
                        fill: '#9399A7',
                    })
        text.text = 'NUMBER OF ROUNDS'
        text.anchor.set(0, 0)
    }

    private createButtons() {

        ;[10, 25, 50, 75, 100, 500, 750, 1000, -1].forEach((count, idx) => {
            const btn = new AutoPlayCountButtonPrefab()
            btn.initial()
            btn.setPlayCount(count)
                    
            this.addPrefab(btn.getViews())
            this.buttons.push(btn)
        })
    }

    private createConfirm() {
        this.confirm = new AutoPlayConfirmButtonPrefab()
        this.confirm.initial()

        this.addPrefab(this.confirm.getViews())
    }

    private createSpin() {
        this.spinGroup = new AutoPlayGroupButtonPrefab()
        this.spinGroup.initial()

        this.addPrefab(this.spinGroup.getViews())
    }

    private drawContainer(layout: Layout) {
        const container = this.getContainer()
        if (!container) return

        switch(layout.style)
        {
            case Style.Portrait: 
                container.position.set(32, 693)
                break

            case Style.MobileHorizon:
                container.position.set(452, 96)
                break

            case Style.DesktopHorizon:
                container.position.set(1456, 412)
                break
        }
    }

    private drawFrame(layout: Layout) {
        const graphics = this.getObject('frame') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().roundRect(0, 0, 1016, 1035, 40).fill('#1D232F')
                break

            case Style.MobileHorizon:
                graphics.clear().roundRect(0, 0, 1016, 891, 40).fill('#1D232F')
                break

            case Style.DesktopHorizon:
                graphics.clear().roundRect(0, 0, 448, 499, 24).fill('#1D232F')
                break
        }
    }

    private drawClose(layout: Layout) {
        const sprite = this.getObject('close') as Sprite
        if (!sprite) return

        switch(layout.style)
        {
            case Style.Portrait: 
                sprite.width = 96
                sprite.height = 96
                sprite.position.set(984.5, 31.5)
                break

            case Style.MobileHorizon:
                sprite.width = 96
                sprite.height = 96
                sprite.position.set(984.5, 31.5)
                break

            case Style.DesktopHorizon:
                sprite.width = 48
                sprite.height = 48
                sprite.position.set(432, 16)
                break
        }
    }

    private drawTitle(layout: Layout) {
        const text = this.getObject('title') as Text
        if (!text) return

        switch(layout.style)
        {
            case Style.Portrait: 
                text.style.fontSize = 58
                text.position.set(60, 60)
                break

            case Style.MobileHorizon:
                text.style.fontSize = 58
                text.position.set(60, 60)
                break

            case Style.DesktopHorizon:
                text.style.fontSize = 30
                text.position.set(32, 30)
                break
        }
    }

    private drawLine(layout: Layout) {
        const graphics = this.getObject('line') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().moveTo(0, 159).lineTo(1015, 159).stroke({ width: 1.34, color: '#495160' })
                break

            case Style.MobileHorizon:
                graphics.clear().moveTo(0, 159).lineTo(1015, 159).stroke({ width: 1.34, color: '#495160' })
                break

            case Style.DesktopHorizon:
                graphics.clear().moveTo(0, 80).lineTo(448, 80).stroke({ width: 1, color: '#495160' })
                break
        }
    }

    private drawMessage(layout: Layout) {
        const text = this.getObject('message') as Text
        if (!text) return

        switch(layout.style)
        {
            case Style.Portrait: 
                text.position.set(72, 235)
                text.style.fontSize = 36
                break

            case Style.MobileHorizon:
                text.position.set(72, 235)
                text.style.fontSize = 36
                break

            case Style.DesktopHorizon:
                text.position.set(32, 112)
                text.style.fontSize = 18
                break
        }
    }

    private drawButtons(layout: Layout) {
        switch(layout.style)
        {
            case Style.Portrait: 
            this.alignButtons({
                startX: 72,
                startY: 291,
                width: 280,
                height: 96,
                round: 92,
                fontSize: 40,
                gapX: 16,
                gapY: 24
            })
                break

            case Style.MobileHorizon:
                this.alignButtons({
                    startX: 72,
                    startY: 291,
                    width: 280,
                    height: 96,
                    round: 92,
                    fontSize: 40,
                    gapX: 16,
                    gapY: 24
                })
                break

            case Style.DesktopHorizon:
                this.alignButtons({
                    startX: 32,
                    startY: 144,
                    width: 122.67,
                    height: 56,
                    round: 56,
                    fontSize: 20,
                    gapX: 8,
                    gapY: 16
                })
                break
        }
    }

    private alignButtons(setting: { startX: number, startY: number, width: number, height: number, 
                                    round: number, fontSize: number, gapX: number, gapY: number}) {

        const style: AutoPlayCountButtonStyle = {
            width: setting.width,
            height: setting.height,
            round: setting.round,
            fontSize: setting.fontSize
        }

        this.buttons.forEach((btn, idx) => {
            btn.setStyle(style)

            const row = idx % 3
            const col = Math.floor(idx / 3)
            const left = row * (setting.width + setting.gapX) + setting.width * 0.5
            const top = col * (setting.height + setting.gapY) + setting.height * 0.5
            btn.position(setting.startX + left, setting.startY + top)
        })
    }

    private drawConfirm(layout: Layout) {
        switch(layout.style)
        {
            case Style.Portrait: 
                this.confirm?.visible(false)
                break

            case Style.MobileHorizon:
                this.confirm?.setStyle({
                    width: 380,
                    height: 120,
                    round: 320,
                    border: 5,
                    fontSize: 45
                })
                this.confirm?.position(508, 750)
                this.confirm?.visible(true)
                break

            case Style.DesktopHorizon:
                this.confirm?.setStyle({
                    width: 260,
                    height: 63,
                    round: 320,
                    border: 3,
                    fontSize: 22
                })
                this.confirm?.position(224, 419.5)
                this.confirm?.visible(true)
                break
        }
    }

    private drawSpin(layout: Layout) {
        switch(layout.style)
        {
            case Style.Portrait: 
                this.spinGroup?.position(508, 827)
                this.spinGroup?.getViews().forEach((view) => {
                    view.onDraw(layout)
                })
                this.spinGroup?.visible(true)
                break

            case Style.MobileHorizon:
                this.spinGroup?.visible(false)
                break

            case Style.DesktopHorizon:
                this.spinGroup?.visible(false)
                break
        }
    }

    public getList() {
        return this.buttons
    }
}