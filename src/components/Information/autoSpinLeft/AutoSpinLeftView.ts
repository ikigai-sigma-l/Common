import * as PIXI from 'pixi.js'
import { View, Layout, Style } from '../../../core/View';

export class AutoSpinLeftView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBackground(layout)
        this.drawAutoSpinLeft(layout)
        this.drawFreeSpinLeft(layout)
        this.drawAutoSpinMessage(layout)
        this.drawFreeSpinMessage(layout)
    }

    private createObjects() {
        this.createBackground()
        this.createAutoSpinLeft()
        this.createFreeSpinLeft()
        this.createAutoSpinMessage()
        this.createFreeSpinMessage()
    } 

    private createBackground() {
        const sprite = this.createSprite('background')
        if (!sprite) return
        sprite.anchor.set(0.5)
        sprite.position.set(0, 0)
        sprite.eventMode = 'static'
        sprite.cursor = 'pointer'
    }

    private createAutoSpinLeft() {
        const text = this.createText('autoSpinLeft')
        if (!text) return
        text.anchor.set(0.5)

        text.style = new PIXI.TextStyle({
                        fontFamily: 'GameFont',
                        fontSize: '72px',
                        fontWeight: 'bold',
                        align: 'center',
                        fill: '#ffffff',
                        letterSpacing: -8,
                    })
    }

    private createFreeSpinLeft() {
        const text = this.createText('freeSpinLeft')
        if (!text) return
        text.anchor.set(0.5)
        text.position.set(-8, -48)

        text.style = new PIXI.TextStyle({
                        fontFamily: 'GameFont',
                        fontSize: '72px',
                        fontWeight: 'bold',
                        align: 'center',
                        fill: '#ffffff',
                        letterSpacing: -8,
                    })
    }

    private createAutoSpinMessage() {
        const text = this.createText('autoMessage')
        if (!text) return
        text.anchor.set(0.5)
        text.position.set(0, 64)

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


    private createFreeSpinMessage() {
        const text = this.createText('freeMessage')
        if (!text) return
        text.anchor.set(0.5)
        text.position.set(0, 64)

        text.style = new PIXI.TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '27px',
                        fontWeight: 'bold',
                        align: 'center',
                        fill: '#151A25',
                        wordWrap: true,
                        breakWords: true,
                    })
    }

    private drawBackground(layout: Layout) {
        const background = this.getObject('background') as PIXI.Sprite
        if (!background) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                background.width = 335
                background.height = 335
                break

            case Style.MobileHorizon:
                background.width = 444
                background.height = 444
                break

            case Style.Portrait:
                background.width = 444
                background.height = 444
                break
        }
    }

    private drawAutoSpinLeft(layout: Layout) {
        const text = this.getObject('autoSpinLeft') as PIXI.Text
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.fontSize = '64px'
                text.position.set(-8, -28)
                break

            case Style.MobileHorizon:
                text.style.fontSize = '72px'
                text.position.set(-8, -48)
                break

            case Style.Portrait:
                text.style.fontSize = '72px'
                text.position.set(-8, -48)
                break
        }
    }

    private drawFreeSpinLeft(layout: Layout) {
        const text = this.getObject('freeSpinLeft') as PIXI.Text
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.fontSize = '64px'
                text.position.set(-8, -28)
                break

            case Style.MobileHorizon:
                text.style.fontSize = '72px'
                text.position.set(-8, -48)
                break

            case Style.Portrait:
                text.style.fontSize = '72px'
                text.position.set(-8, -48)
                break
        }
    }

    private drawAutoSpinMessage(layout: Layout) {
        const text = this.getObject('autoMessage') as PIXI.Text
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.wordWrapWidth = 128
                text.style.fontSize = '21px'
                text.position.set(0, 48)
                break

            case Style.MobileHorizon:
                text.style.wordWrapWidth = 174
                text.style.fontSize = '27px'
                text.position.set(0, 64)
                break

            case Style.Portrait:
                text.style.wordWrapWidth = 174
                text.style.fontSize = '27px'
                text.position.set(0, 64)
                break
        }
    }

    private drawFreeSpinMessage(layout: Layout) {
        const text = this.getObject('freeMessage') as PIXI.Text
        if (!text) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                text.style.wordWrapWidth = 128
                text.style.fontSize = '21px'
                text.position.set(0, 48)
                break

            case Style.MobileHorizon:
                text.style.wordWrapWidth = 174
                text.style.fontSize = '27px'
                text.position.set(0, 64)
                break

            case Style.Portrait:
                text.style.wordWrapWidth = 174
                text.style.fontSize = '27px'
                text.position.set(0, 64)
                break
        }
    }
}