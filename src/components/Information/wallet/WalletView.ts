import * as PIXI from 'pixi.js'
import { View, Layout, Style } from '../../../core/View';
import { AttributePrefab } from '../attribute/AttributePrefab';
import { language } from '../../../utility/Language';

export class WalletView extends View {

    protected balance: AttributePrefab | null = null

    protected betValue: AttributePrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBalance(layout)
        this.drawDivide(layout)
        this.drawBetValue(layout)
        this.alignment()
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
        this.createBalance()
        this.createDivide()
        this.createBetValue()
    } 

    private createBalance() {
        this.balance = new AttributePrefab()
        this.balance.initial()
        this.balance.title(language.text('ACCOUNT_BALANCE'))

        this.addPrefab(this.balance.getViews())
    }

    private createDivide() {
        const graphic = this.createGraphic('div')
    }

    private createBetValue() {
        this.betValue = new AttributePrefab()
        this.betValue.initial()
        this.betValue.title(language.text('ACCOUNT_BET'))

        this.addPrefab(this.betValue.getViews())
    }

    private drawBalance(layout: Layout) {
        this.balance?.getViews()?.forEach((view) => {
            view.onDraw(layout)
        })
    }

    private drawDivide(layout: Layout) {
        const graphic = this.getObject('div') as PIXI.Graphics
        if (!graphic) return

        let height = 0
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                height = 52
                break

            case Style.MobileHorizon:
                height = 60
                break

            case Style.Portrait:
                height = 60
                break
        }

        graphic.clear().moveTo(0, 0).lineTo(0, height).stroke({ color: 0xFFFFFF, alpha: 0.2, width: 1})
    }

    private drawBetValue(layout: Layout) {
        this.betValue?.getViews()?.forEach((view) => {
            view.onDraw(layout)
        })
    }

    private alignment() {
        const gap: number = 30

        let pos: number = 0

        this.balance?.position(pos, 0)

        pos += this.balance?.width() ?? 0;
        pos += gap;

        (this.getObject('div') as PIXI.Graphics)?.position.set(pos, 0)

        pos += gap;

        this.betValue?.position(pos, 0)
    }

    public updateLayout() {
        this.alignment()
    }

    public getBalance() {
        return this.balance
    }

    public getBetValue() {
        return this.betValue
    }
}