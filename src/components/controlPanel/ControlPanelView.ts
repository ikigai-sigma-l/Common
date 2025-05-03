import { View, Layout, Style } from '../../core/View';
import { BottomBarPrefab } from '../bottombar/BottomBarPrefab';

import { SpinButtonPrefab } from '../buttons/spin/SpinButtonPrefab';
import { SpeedButtonPrefab } from '../buttons/speed/SpeedButtonPrefab';
import { AutoButtonPrefab } from '../buttons/auto/AutoButtonPrefab';
import { BuySpinButtonPrefab } from '../buttons/buySpin/BuySpinButtonPrefab';
import { SettingButtonPrefab } from '../buttons/setting/SettingButtonPrefab';
import { SoundButtonPrefab } from '../buttons/sound/SoundButtonPrefab';
import { InfoButtonPrefab } from '../buttons/information/InfoButtonPrefab';
import { BetValueButtonPrefab } from '../buttons/betValue/BetValueButtonPrefab';
import { FullScreenButtonPrefab } from '../buttons/fullScreen/FullScreenPrefab';
import { StopButtonPrefab } from '../buttons/stop/StopButtonPrefab';
import { SpinGrowPrefab } from '../spinGrow/spinGrowPrefab';

export class ControlPanelView extends View {

    private bottomBar: BottomBarPrefab | null = null
    private spinGrow: SpinGrowPrefab | null = null
    private spinButton: SpinButtonPrefab | null = null
    private stopButton: StopButtonPrefab | null = null
    private speedButton: SpeedButtonPrefab | null = null
    private autoButton: AutoButtonPrefab | null = null
    private buySpinButton: BuySpinButtonPrefab | null = null
    private settingButton: SettingButtonPrefab | null = null
    private soundButton: SoundButtonPrefab | null = null
    private infoButton: InfoButtonPrefab | null = null
    private betValueButton: BetValueButtonPrefab | null = null
    private fullScreenButton: FullScreenButtonPrefab | null = null


    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        this.bottomBar?.release()
        this.spinGrow?.release()
        this.spinButton?.release()
        this.stopButton?.release()
        this.speedButton?.release()
        this.autoButton?.release()
        this.buySpinButton?.release()
        this.settingButton?.release()
        this.soundButton?.release()
        this.infoButton?.release()
        this.betValueButton?.release()
        this.fullScreenButton?.release()
        
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBottomBar(layout)
        this.drawSpinGrow(layout)
        this.drawSpinButton(layout)
        this.drawStopButton(layout)
        this.drawSpeedButton(layout)
        this.drawAutoButton(layout)
        this.drawBuySpinButton(layout)
        this.drawSettingButton(layout)
        this.drawSoundButton(layout)
        this.drawInfoButton(layout)
        this.drawBetValueButton(layout)
        this.drawFullScreenButton(layout)
    }

    protected createObjects() {
        this.createBottomBar()
        this.createSpinGrow()
        this.createSpinButton()
        this.createStopButton()
        this.createSpeedButton()
        this.createAutoButton()
        this.createBuySpinButton()
        this.createSettingButton()
        this.createSoundButton()
        this.createInfoButton()
        this.createBetValueButton()
        this.createFullScreenButton()
    }

    private addPrefab(views: View[]) {
        const parent = this.getContainer()
        if (!parent) return

        views.forEach((view) => {
            const container = view.getContainer()
            if (container) parent.addChild(container)
        })
    }

    private createBottomBar() {
        this.bottomBar = new BottomBarPrefab()
        this.bottomBar.initial()

        this.addPrefab(this.bottomBar.getViews())
    }

    private createSpinGrow() {
        this.spinGrow = new SpinGrowPrefab()
        this.spinGrow.initial()

        this.addPrefab(this.spinGrow.getViews())
    }

    private createSpinButton() {
        this.spinButton = new SpinButtonPrefab()
        this.spinButton.initial()

        this.addPrefab(this.spinButton.getViews())
    }

    private createStopButton() {
        this.stopButton = new StopButtonPrefab()
        this.stopButton.initial()

        this.addPrefab(this.stopButton.getViews())
    }

    private createSpeedButton() {
        this.speedButton = new SpeedButtonPrefab()
        this.speedButton.initial()

        this.addPrefab(this.speedButton.getViews())
    }

    private createAutoButton() {
        this.autoButton = new AutoButtonPrefab()
        this.autoButton.initial()

        this.addPrefab(this.autoButton.getViews())
    }

    private createBuySpinButton() {
        this.buySpinButton = new BuySpinButtonPrefab()
        this.buySpinButton.initial()

        this.addPrefab(this.buySpinButton.getViews())
    }

    private createSettingButton() {
        this.settingButton = new SettingButtonPrefab()
        this.settingButton.initial()

        this.addPrefab(this.settingButton.getViews())
    }

    private createSoundButton() {
        this.soundButton = new SoundButtonPrefab()
        this.soundButton.initial()

        this.addPrefab(this.soundButton.getViews())
    }

    private createInfoButton() {
        this.infoButton = new InfoButtonPrefab()
        this.infoButton.initial()

        this.addPrefab(this.infoButton.getViews())
    }

    private createBetValueButton() {
        this.betValueButton = new BetValueButtonPrefab()
        this.betValueButton.initial()

        this.addPrefab(this.betValueButton.getViews())
    }

    private createFullScreenButton() {
        this.fullScreenButton = new FullScreenButtonPrefab()
        this.fullScreenButton.initial()

        this.addPrefab(this.fullScreenButton.getViews())
    }

    private drawBottomBar(layout: Layout) {
        this.bottomBar?.getViews().forEach((view) => {
            view.onDraw(layout)
        })
        this.bottomBar?.position(0, layout.height)
    }

    private drawSpinGrow(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.spinGrow?.position(1508, 967 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.spinGrow?.position(1720, 544)
                break

            case Style.Portrait:
                this.spinGrow?.position(540, 1576)
                break
        }
        this.spinGrow?.getViews()?.forEach((view) => view.onDraw(layout))
    }

    private drawSpinButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.spinButton?.size(200, 200)
                this.spinButton?.position(1508, 967 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.spinButton?.size(272, 272)
                this.spinButton?.position(1720, 544)
                break

            case Style.Portrait:
                this.spinButton?.size(272, 272)
                this.spinButton?.position(540, 1576)
                break
        }
        this.spinButton?.getViews()?.forEach((view) => view.onDraw(layout))
    }

    private drawStopButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.stopButton?.size(200, 200)
                this.stopButton?.position(1508, 967 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.stopButton?.size(272, 272)
                this.stopButton?.position(1720, 544)
                break

            case Style.Portrait:
                this.stopButton?.size(272, 272)
                this.stopButton?.position(540, 1576)
                break
        }
        this.stopButton?.getViews()?.forEach((view) => view.onDraw(layout))
    }

    private drawSpeedButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.speedButton?.size(80, 80)
                this.speedButton?.position(1336, 968 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.speedButton?.size(144, 144)
                this.speedButton?.position(1720, 300)
                break

            case Style.Portrait:
                this.speedButton?.size(144, 144)
                this.speedButton?.position(300, 1576)
                break
        }
    }

    private drawAutoButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.autoButton?.size(80, 80)
                this.autoButton?.position(1680, 968 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.autoButton?.size(144, 144)
                this.autoButton?.position(1720, 788)
                break

            case Style.Portrait:
                this.autoButton?.size(144, 144)
                this.autoButton?.position(780, 1576)
                break
        }
    }

    private drawBuySpinButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.buySpinButton?.size(80, 80)
                this.buySpinButton?.position(1864, 56)
                break

            case Style.MobileHorizon:
                this.buySpinButton?.size(96, 96)
                this.buySpinButton?.position(1856, 64)
                break

            case Style.Portrait:
                this.buySpinButton?.size(96, 96)
                this.buySpinButton?.position(1016, 64)
                break
        }
    }

    private drawSettingButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.settingButton?.size(40, 40)
                this.settingButton?.position(44, 1003 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.settingButton?.size(112, 112)
                this.settingButton?.position(1592, 1004 + layout.paddingY)
                break

            case Style.Portrait:
                this.settingButton?.size(112, 112)
                this.settingButton?.position(752, 1844 + layout.paddingY)
                break
        }
    }

    private drawSoundButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.soundButton?.size(40, 40)
                this.soundButton?.position(44, 1047 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.soundButton?.size(112, 112)
                this.soundButton?.position(1720, 1004 + layout.paddingY)
                break

            case Style.Portrait:
                this.soundButton?.size(112, 112)
                this.soundButton?.position(880, 1844 + layout.paddingY)
                break
        }
    }

    private drawInfoButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.infoButton?.size(64, 64)
                this.infoButton?.position(108, 1023 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.infoButton?.size(112, 112)
                this.infoButton?.position(1848, 1004 + layout.paddingY)
                break

            case Style.Portrait:
                this.infoButton?.size(112, 112)
                this.infoButton?.position(1008, 1844 + layout.paddingY)
                break
        }
    }

    private drawBetValueButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.betValueButton?.size(64, 64)
                this.betValueButton?.position(1784, 1025 + layout.paddingY)
                break

            case Style.MobileHorizon:
                this.betValueButton?.size(112, 112)
                this.betValueButton?.position(72, 1004 + layout.paddingY)
                break

            case Style.Portrait:
                this.betValueButton?.size(112, 112)
                this.betValueButton?.position(72, 1844 + layout.paddingY)
                break
        }
    }

    private drawFullScreenButton(layout: Layout): void {
        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.fullScreenButton?.size(64, 64)
                this.fullScreenButton?.position(1864, 1025 + layout.paddingY)
                this.fullScreenButton?.visible(true)
                break

            case Style.MobileHorizon:
                this.fullScreenButton?.visible(false)
                break

            case Style.Portrait:
                this.fullScreenButton?.visible(false)
                break
        }
    }
}