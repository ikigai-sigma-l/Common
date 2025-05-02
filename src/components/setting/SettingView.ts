import { View, Layout, Style } from '../../core/View';
import { Assets, Container, FillGradient, Graphics, Sprite, Text, TextStyle } from 'pixi.js';
import { ScrollBox } from '@pixi/ui';
import { SettingToggleItemPrefab } from './SettingToggleItemPrefab';
import { SettingButtonItemPrefab } from './SettingButtonItemPrefab';
import { Gradient } from '../../utility/GradientUtility';

export class SettingView extends View {

    private battery: SettingToggleItemPrefab | null = null
    private music: SettingToggleItemPrefab | null = null
    private sound: SettingToggleItemPrefab | null = null
    private history: SettingButtonItemPrefab | null = null
    private exit: SettingButtonItemPrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawContainerPosition(layout)
        this.drawBackground(layout)
        this.drawClose(layout)
        this.drawTitle(layout)
        
        this.drawBattery(layout)
        this.drawMusic(layout)
        this.drawSound(layout)
        this.drawHistory(layout)
        this.drawExit(layout)

        this.drawScroll(layout)
    }

    private createObjects() {
        this.createBackground()
        this.createClose()
        this.createTitle()
        this.createScroll()
    }

    private createBackground() {
        const graphics = this.createGraphic('background')
    }

    private createClose() {
        const sprite = this.createSprite('close')
        if (!sprite) return

        sprite.texture = Assets.get('close_normal.png')
        sprite.width = 96
        sprite.height = 96
        sprite.anchor.set(1,0)
        sprite.eventMode = 'static'
        sprite.cursor = 'pointer'
    }

    private createTitle() {
        const text = this.createText('title')
        if (!text) return
    
        text.style = new TextStyle({
                        fontFamily: 'UiFont',
                        fontSize: '58px',
                        fontWeight: 'bold',
                        align: 'left',
                        fill: Gradient.popUpTitle,
                    })
        text.text = 'GAME SETTING'
        text.anchor.set(0, 0)
        text.position.set(56, 48)
    }

    private createBattery() {
        this.battery = new SettingToggleItemPrefab()
        this.battery.initial()

        return this.battery.container()
    }

    private createMusic() {
        this.music = new SettingToggleItemPrefab()
        this.music.initial()

        return this.music.container()
    }

    private createSound() {
        this.sound = new SettingToggleItemPrefab()
        this.sound.initial()

        return this.sound.container()
    }

    private createHistory() {
        this.history = new SettingButtonItemPrefab()
        this.history.initial()

        return this.history.container()
    }

    private createExit() {
        this.exit = new SettingButtonItemPrefab()
        this.exit.initial()

        return this.exit.container()
    }

    private createScroll() {
        const scrollBox = this.createScrollBox('scrollBox')
        if (!scrollBox) return

        const children: Container[] = []

        const battery = this.createBattery()
        if (battery) children.push(battery)

        const music = this.createMusic()
        if (music) children.push(music)

        const sound = this.createSound()
        if (sound) children.push(sound)

        const history = this.createHistory()
        if (history) children.push(history)

        const exit = this.createExit()
        if (exit) children.push(exit)

        scrollBox.addItems(children)
    }

    private drawContainerPosition(layout: Layout) {
        const container = this.getContainer()
        if (!container) return

        switch(layout.style)
        {
            case Style.Portrait: 
                container.position.set(40, 758)
                break

            case Style.MobileHorizon:
                container.position.set(476, 51)
                break

            case Style.DesktopHorizon:
                container.position.set(656, 209)
                break
        }
    }

    private drawBackground(layout: Layout) {
        const graphics = this.getObject('background') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().roundRect(0, 0, 1000, 970, 40).fill('#151A25')
                break

            case Style.MobileHorizon:
                graphics.clear().roundRect(0, 0, 968, 970, 40).fill('#151A25')
                break

            case Style.DesktopHorizon:
                graphics.clear().roundRect(0, 0, 608, 662, 24).fill('#151A25')
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
                sprite.position.set(968, 52)
                break

            case Style.MobileHorizon:
                sprite.width = 96
                sprite.height = 96
                sprite.position.set(936, 52)
                break

            case Style.DesktopHorizon:
                sprite.width = 56
                sprite.height = 56
                sprite.position.set(584, 32)
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
                text.position.set(72, 80)
                break

            case Style.MobileHorizon:
                text.style.fontSize = 58
                text.position.set(72, 80)
                break

            case Style.DesktopHorizon:
                text.style.fontSize = 35
                text.position.set(56, 48)
                break
        }
    }

    private drawScroll(layout: Layout) {
        const scrollBox = this.getObject('scrollBox') as ScrollBox
        if (!scrollBox) return

        switch(layout.style)
        {
            case Style.Portrait: 
                scrollBox.width = 856
                scrollBox.height = 707
                scrollBox.resize(true)

                scrollBox.position.set(72, 183)
                break

            case Style.MobileHorizon:
                scrollBox.width = 824
                scrollBox.height = 701
                scrollBox.resize(true)

                scrollBox.position.set(72, 189)
                break

            case Style.DesktopHorizon:
                scrollBox.width = 496
                scrollBox.height = 463
                scrollBox.resize(true)

                scrollBox.position.set(56, 127)
                break
        }
    }

    private drawBattery(layout: Layout) {
        this.battery?.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawMusic(layout: Layout) {
        this.music?.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawSound(layout: Layout) {
        this.sound?.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawHistory(layout: Layout) {
        this.history?.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawExit(layout: Layout) {
        this.exit?.getViews().forEach((view) => view.onDraw(layout))
    }

    public getBattery() {
        return this.battery
    }

    public getMusic() {
        return this.music
    }

    public getSound() {
        return this.sound
    }

    public getHistory() {
        return this.history
    }

    public getExit() {
        return this.exit
    }
}