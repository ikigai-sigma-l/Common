import { View, Layout, Style } from '../../core/View';
import { Text, FillGradient, Graphics, Sprite, TextStyle } from 'pixi.js';
import { Gradient } from '../../utility/GradientUtility';
import { winSymbolFactory } from 'src/factory/WinSymbol/WinSymbolFactory';
import { WinSymbolPrefab } from 'src/factory/WinSymbol/WinSymbolPrefab';

export class WinBottomLineView extends View {

    private gap: number = 32

    private winSymbol: WinSymbolPrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        this.winSymbol?.release()
        this.winSymbol = null
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawFrame(layout)
        this.drawWinSymbol(layout)
        this.drawMessage(layout)
        this.drawWinMoney(layout)
        this.drawWinCurrency(layout)
        this.updateGap(layout)
        this.align()
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
        this.createFrame()
        this.createWinSymbol()
        this.createMessage()
        this.createWinMoney()
        this.createWinCurrency()
    } 

    private createFrame() {
        this.createGraphic('frame')
    }

    private createWinSymbol() {
        this.winSymbol = winSymbolFactory.create()
        this.winSymbol?.initial()

        if (this.winSymbol) {
            this.addPrefab(this.winSymbol.getViews())
        }
    }

    private createMessage() {
        const text = this.createText('message')
        if (!text) return

        text.anchor.set(0, 0.5)
        text.style = new TextStyle({
            fontFamily: 'UiFont',
            fontSize: '32',
            align: 'center',
            fill: Gradient.message,
        })
    }

    private createWinMoney() {
        const text = this.createText('winMoney')
        if (!text) return

        text.anchor.set(0, 0.5)
        text.style = new TextStyle({
            fontFamily: 'UiFont',
            fontSize: '36',
            align: 'center',
            fill: Gradient.title,
        })

        text.text = '18.00'
    }

    private createWinCurrency() {
        const text = this.createText('winCurrency')
        if (!text) return

        text.anchor.set(0, 0.5)
        text.style = new TextStyle({
            fontFamily: 'UiFont',
            fontSize: '32',
            align: 'center',
            fill: Gradient.title,
        })

        text.text = 'USD'
    }

    private drawFrame(layout: Layout) {
        const frame = this.getObject('frame')
        if (!frame) return

        frame.visible = layout.style === Style.Portrait
    }

    private drawWinSymbol(layout: Layout) {
        this.winSymbol?.getViews()?.forEach((view) => {
            view.onDraw(layout)
        })
    }

    private drawMessage(layout: Layout) {
        const message = this.getObject('message') as Text
        if (!message) return

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                message.style.fontSize = '26'
                break

            case Style.MobileHorizon:
                message.style.fontSize = '26'
                break

            case Style.Portrait:
                message.style.fontSize = '35'
                break
        }
    }

    private drawWinMoney(layout: Layout) {
        const winMoney = this.getObject('winMoney') as Text
        if (!winMoney) return
    
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                winMoney.style.fontSize = '26'
                break

            case Style.MobileHorizon:
                winMoney.style.fontSize = '26'
                break

            case Style.Portrait:
                winMoney.style.fontSize = '35'
                break
        }
    }
    
      private drawWinCurrency(layout: Layout) {
        const winCurrency = this.getObject('winCurrency') as Text
        if (!winCurrency) return
    
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                winCurrency.style.fontSize = '24'
                break

            case Style.MobileHorizon:
                winCurrency.style.fontSize = '24'
                break

            case Style.Portrait:
                winCurrency.style.fontSize = '32'
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

        if (this.winSymbol) width += this.winSymbol.width()

        const message = this.getObject('message') as Text
        if (message) width += this.gap + message.width

        const money = this.getObject('winMoney') as Text
        if (money) width += this.gap + money.width

        const currency = this.getObject('winCurrency') as Text
        if (currency) width += this.gap + currency.width

        let start = width * -0.5

        if (this.winSymbol) {
            this.winSymbol.setPosition(start, 0)
            start += this.winSymbol.width() + this.gap
        }

        if (message) {
            message.position.set(start, 0)
            start += message.width + this.gap
        }

        if (money) {
            money.position.set(start, 0)
            start += money.width + this.gap
        }

        if (currency) {
            currency.position.set(start, ((money?.height ?? 0) - currency.height) * 0.5)
        }

        this.paintFrame(width)
    }
}