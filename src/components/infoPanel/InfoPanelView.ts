import * as PIXI from 'pixi.js'
import { View, Layout, Style } from '../../core/View';
import { TimerPrefab } from '../timer/TimerPrefab';
import { AnnouncementPrefab } from '../Information/announcement/AnnouncementPrefab';
import { WalletPrefab } from '../Information/wallet/WalletPrefab';
import { AutoSpinLeftPrefab } from '../Information/autoSpinLeft/AutoSpinLeftPrefab';

export class InfoPanelView extends View {

    private timer : TimerPrefab | null = null
    private announce: AnnouncementPrefab | null = null
    private wallet: WalletPrefab | null = null
    private autoLeft: AutoSpinLeftPrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        
        this.timer?.release()
        this.timer = null

        this.announce?.release()
        this.announce = null

        this.wallet?.release()
        this.wallet = null

        this.autoLeft?.release()
        this.autoLeft = null

        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawTimer(layout)
        this.drawAnnounce(layout)
        this.drawWallet(layout)
        this.drawAutoSpinLeft(layout)
    }

    private createObjects() {
        this.createTimer()
        this.createAnnounce()
        this.createWallet()
        this.createAutoSpinLeft()
    } 

    private addPrefab(views: View[]) {
        const parent = this.getContainer()
        if (!parent) return

        views.forEach((view) => {
            const container = view.getContainer()
            if (container) parent.addChild(container)
        })
    }

    private createTimer() {
        this.timer = new TimerPrefab()
        this.timer.initial()
    
        this.addPrefab(this.timer.getViews())
    }

    private createAnnounce() {
        this.announce = new AnnouncementPrefab()
        this.announce.initial()

        this.addPrefab(this.announce.getViews())
    }

    private createWallet() {
        this.wallet = new WalletPrefab()
        this.wallet.initial()

        this.addPrefab(this.wallet.getViews())
    }

    private createAutoSpinLeft() {
        this.autoLeft = new AutoSpinLeftPrefab()
        this.autoLeft.initial()

        this.addPrefab(this.autoLeft.getViews())
    }

    private drawTimer(layout: Layout) {
        this.timer?.position(54, 34)
        this.timer?.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawAnnounce(layout: Layout) {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.announce?.position(960, 1024 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.announce?.position(960, 1010 + layout.paddingY)
                break

            case Style.Portrait:
                this.announce?.position(542, 408)
                break
        }

        this.announce?.getViews().forEach((view) => {
            view.onDraw(layout)
        })
    }

    private drawWallet(layout: Layout) {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.wallet?.position(154, 998 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.wallet?.position(154, 968 + layout.paddingY)
                break

            case Style.Portrait:
                this.wallet?.position(148, 1814 + layout.paddingY)
                break
        }

        this.wallet?.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawAutoSpinLeft(layout: Layout) {

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.autoLeft?.position(1508, 967 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.autoLeft?.position(1720, 544)
                break

            case Style.Portrait:
                this.autoLeft?.position(540, 1576)
                break
        }

        this.autoLeft?.getViews().forEach((view) => {
            view.onDraw(layout)
        })
    }
}