import { Gradient } from '../../utility/GradientUtility';
import { View, Layout, Style } from '../../core/View';
import { Assets, Container, FillGradient, Graphics, Sprite, Text, TextStyle } from 'pixi.js';

export class ToggleView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBackground(layout)
        this.drawFill(layout)
        this.drawCloseButton(layout)
        this.drawOpenButton(layout)
    }

    private createObjects() {
        this.createBackground()
        this.createFill()
        this.createCloseButton()
        this.createOpenButton()
    }

    private createBackground() {
        const graphics = this.createGraphic('background')
    }

    private createFill() {
        const graphics = this.createGraphic('fill')
    }

    private createCloseButton() {
        const graphics = this.createGraphic('close')
    }

    private createOpenButton() {
        const graphics = this.createGraphic('open')
    }

    private drawBackground(layout: Layout) {
        const graphics = this.getObject('background') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().roundRect(0, -35, 140, 70, 1000).fill('#333843')
                break

            case Style.MobileHorizon:
                graphics.clear().roundRect(0, -35, 140, 70, 1000).fill('#333843')
                break

            case Style.DesktopHorizon:
                graphics.clear().roundRect(0, -16, 63, 32, 16).fill('#333843')
                break
        }
    }

    private drawFill(layout: Layout) {
        const graphics = this.getObject('fill') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().roundRect(0, -35, 140, 70, 1000).fill('#107D42')
                break

            case Style.MobileHorizon:
                graphics.clear().roundRect(0, -35, 140, 70, 1000).fill('#107D42')
                break

            case Style.DesktopHorizon:
                graphics.clear().roundRect(0, -16, 63, 32, 16).fill('#107D42')
                break
        }
    }

    private drawCloseButton(layout: Layout) {
        const graphics = this.getObject('close') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().circle(0, 0, 28).fill(Gradient.btnSelect)
                graphics.position.set(34, 0)
                break

            case Style.MobileHorizon:
                graphics.clear().circle(0, 0, 28).fill(Gradient.btnSelect)
                graphics.position.set(34, 0)
                break

            case Style.DesktopHorizon:
                graphics.clear().circle(0, 0, 13).fill(Gradient.btnSelect)
                graphics.position.set(16, 0)
                break
        }
    }

    private drawOpenButton(layout: Layout) {
        const graphics = this.getObject('open') as Graphics
        if (!graphics) return

        switch(layout.style)
        {
            case Style.Portrait: 
                graphics.clear().circle(0, 0, 28).fill(Gradient.btnSelect)
                graphics.position.set(106, 0)
                break

            case Style.MobileHorizon:
                graphics.clear().circle(0, 0, 28).fill(Gradient.btnSelect)
                graphics.position.set(108, 0)
                break

            case Style.DesktopHorizon:
                graphics.clear().circle(0, 0, 13).fill(Gradient.btnSelect)
                graphics.position.set(47, 0)
                break
        }
    }
}