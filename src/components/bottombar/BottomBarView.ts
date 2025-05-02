import * as PIXI from 'pixi.js'
import { View, Layout, Style } from 'src/core/View';
import { Gradient } from 'src/utility/GradientUtility';

export class BottomBarView extends View {

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBottomBar(layout)
    }

    private createObjects() {
        this.createBottomBar()
    }
    
    private createBottomBar() {
        this.createGraphic('bottomBar')
    }

    private drawBottomBar(layout: Layout) {
        const bottomBar = this.getObject('bottomBar') as PIXI.Graphics
        if (!bottomBar) return

        let top = 0

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                top = -122
                break

            case Style.MobileHorizon:
                top = -152
                break

            case Style.Portrait:
                top = -152
                break
        }

        bottomBar.clear()
                .rect(-layout.paddingX, top + layout.paddingY, layout.width + layout.paddingX * 2, top * -1)
                .fill(Gradient.bottomBar)
    }
}