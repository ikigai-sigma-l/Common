import { Gradient } from '../../utility/GradientUtility';
import { View, Layout, Style } from '../../core/View';
import { BitmapText, FillGradient, Graphics, Sprite, Text, TextStyle } from 'pixi.js';

export class WinTopLineView extends View {

    private gap: number = 32

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawFrame(layout)
        this.drawMessage(layout)
        this.drawWinMoney(layout)
        this.drawWinCurrency(layout)
        this.updateGap(layout)
        this.align()
    }

    private createObjects() {
        this.createFrame()
        this.createMessage()
        this.createWinMoney()
        this.createWinCurrency()
    } 

    private createFrame() {
        this.createGraphic('frame')
    }

    private createMessage() {
        const text = this.createText('message')
        if (!text) return
        
        text.anchor.set(0, 0.5)
        text.style = new TextStyle({
            fontFamily: 'UiFont',
            fontSize: '32',
            align: 'center',
            fill: Gradient.title,
        })
    }

    private createWinMoney() {
        const text = this.createBitmapText('winMoney')
        if (!text) return

        text.anchor.set(0, 0.5)
        text.style = new TextStyle({
            fontFamily: 'UiFont',
            fontSize: '36',
            align: 'center',
            fill: Gradient.message,
        })

        text.text = '18.00'
    }

    private createWinCurrency() {
        const text = this.createBitmapText('winCurrency')
        if (!text) return

        text.anchor.set(0, 0.5)
        text.style = new TextStyle({
            fontFamily: 'UiFont',
            fontSize: '32',
            align: 'center',
            fill: Gradient.message,
        })

        text.text = 'USD'
    }

    private drawFrame(layout: Layout) {
        const frame = this.getObject('frame')
        if (!frame) return

        frame.visible = layout.style === Style.Portrait
    }

    private drawMessage(layout: Layout) {
        const message = this.getObject('message') as Text
        if (!message) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                message.style.fontSize = '32'
                break

            case Style.MobileHorizon:
                message.style.fontSize = '32'
                break

            case Style.Portrait:
                message.style.fontSize = '40'
                break
        }
    }

    private drawWinMoney(layout: Layout) {
        const winMoney = this.getObject('winMoney') as BitmapText
        if (!winMoney) return
    
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                winMoney.style.fontSize = '36'
                break

            case Style.MobileHorizon:
                winMoney.style.fontSize = '36'
                break

            case Style.Portrait:
                winMoney.style.fontSize = '48'
                break
        }
    }
    
      private drawWinCurrency(layout: Layout) {
        const winCurrency = this.getObject('winCurrency') as BitmapText
        if (!winCurrency) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                winCurrency.style.fontSize = '32'
                break

            case Style.MobileHorizon:
                winCurrency.style.fontSize = '32'
                break

            case Style.Portrait:
                winCurrency.style.fontSize = '40'
                break
        }
    }

    private updateGap(layout: Layout) {
        this.gap = layout.style === Style.DesktopHorizon ? 6.8 : 9
    }

    private paintFrame(width: number) {
        const frame = this.getObject('frame') as Graphics
        if (!frame) return

        const paddingX = 32
        const widthFrame = width + paddingX * 2
        const heightFrame = 64
        frame
            .clear()
            .roundRect(widthFrame * -0.5, heightFrame * -0.5, widthFrame, heightFrame, 57)
            .fill(Gradient.frame)
    }

    public align() {
        let width = 0

        const message = this.getObject('message') as Sprite
        if (message) width += message.width

        const money = this.getObject('winMoney') as BitmapText
        if (money) width += this.gap + money.width

        const currency = this.getObject('winCurrency') as BitmapText
        if (currency) width += this.gap + currency.width

        let start = width * -0.5

        if (message) {
            message.position.set(start, ((money?.height ?? 0) - message.height) * 0.5)
            start += message.width + this.gap
        }

        if (money) {
            money.position.set(start, 0)
            start += money.width + this.gap
        }

        if (currency) {
            currency.position.set(start, ((money?.height ?? 0) - currency.height) * -0.5)
        }

        this.paintFrame(width)
    }
}