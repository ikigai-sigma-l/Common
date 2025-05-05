import { View, Layout, Style } from '../../core/View';
import { Assets, Container, FillGradient, Graphics, Sprite, Text, TextStyle } from 'pixi.js';
import { BetSelectorListPrefab } from './BetSelectorListPrefab';
import { ScrollBox } from '@pixi/ui';
import { Gradient } from '../../utility/GradientUtility';

export class BetSelectorView extends View {

    private betSelectList: BetSelectorListPrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        this.betSelectList?.release()
        this.betSelectList = null
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawContainerPosition(layout)
        this.drawBackground(layout)
        this.drawClose(layout)
        this.drawTitle(layout)
        this.drawScroll(layout)
        this.drawList(layout)
    }

    private createObjects() {
        this.createBackground()
        this.createClose()
        this.createTitle()
        this.createScroll()
    }

    private createBackground() {
        const graphics = this.createGraphic('background')
        if (!graphics) return

        graphics.clear().roundRect(0, 0, 1000, 1300, 40).fill('#151A25')
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
                        fill: Gradient.title,
                    })
        text.text = 'THE BET'
        text.anchor.set(0, 0)
        text.position.set(72, 80)
    }

    private createScroll() {
        const scrollBox = this.createScrollBox('scrollBox')
        if (!scrollBox) return

        const children = this.createList().reduce((prev : Container[], cur) => {
            const container = cur.getContainer()
            if (container) prev.push(container)
            return prev
        }, [])

        scrollBox.addItems(children)
    }

    private createList() {
        this.betSelectList = new BetSelectorListPrefab()
        this.betSelectList.initial()

        return this.betSelectList.getViews()
    }

    private drawContainerPosition(layout: Layout) {
        const container = this.getContainer()
        if (!container) return

        switch(layout.style)
        {
            case Style.Portrait: 
                container.position.set(40, 428)
                break

            case Style.MobileHorizon:
                container.position.set(240, 40)
                break

            case Style.DesktopHorizon:
                container.position.set(1224, 185)
                break
        }
    }

    private drawBackground(layout: Layout) {
        const graphics = this.getObject('background') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().roundRect(0, 0, 1000, 1300, 40).fill('#151A25')
                break

            case Style.MobileHorizon:
                graphics.clear().roundRect(0, 0, 1440, 1000, 40).fill('#151A25')
                break

            case Style.DesktopHorizon:
                graphics.clear().roundRect(0, 0, 672, 759, 24).fill('#151A25')
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
                sprite.position.set(928, 72)
                break

            case Style.MobileHorizon:
                sprite.width = 96
                sprite.height = 96
                sprite.position.set(1360, 80)
                break

            case Style.DesktopHorizon:
                sprite.width = 56
                sprite.height = 56
                sprite.position.set(624, 48)
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
                text.position.set(80, 80)
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
                scrollBox.height = 1031
                scrollBox.resize(true)

                scrollBox.position.set(72, 189)
                break

            case Style.MobileHorizon:
                scrollBox.width = 1280
                scrollBox.height = 729
                scrollBox.resize(true)

                scrollBox.position.set(80, 191)
                break

            case Style.DesktopHorizon:
                scrollBox.width = 560
                scrollBox.height = 560
                scrollBox.resize(true)

                scrollBox.position.set(56, 127)
                break
        }
    }

    private drawList(layout: Layout) {
        this.betSelectList?.setStyle(layout.style)
    }
}