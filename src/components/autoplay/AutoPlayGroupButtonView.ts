import { View, Layout, Style } from '../../core/View';
import { Assets, Graphics, Sprite, TextStyle, FillGradient } from 'pixi.js';
import { SpinButtonPrefab } from '../buttons/spin/SpinButtonPrefab';
import { SpeedButtonPrefab } from '../buttons/speed/SpeedButtonPrefab';
import { AutoSpinLeftPrefab } from '../Information/autoSpinLeft/AutoSpinLeftPrefab';
import { AutoButtonPrefab } from '../buttons/auto/AutoButtonPrefab';
import { StopButtonPrefab } from '../buttons/stop/StopButtonPrefab';

export class AutoPlayGroupButtonView extends View {

    private spin: SpinButtonPrefab | null = null
    private stop: StopButtonPrefab | null = null
    private left: AutoSpinLeftPrefab | null = null

    private speed: SpeedButtonPrefab | null = null
    private auto: AutoButtonPrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        this.spin?.release()
        this.spin = null

        this.stop?.release()
        this.stop = null

        this.left?.release()
        this.left = null

        this.speed?.release()
        this.speed = null

        this.auto?.release()
        this.auto = null

        super.release()
    }

    public onDraw(layout: Layout) {
        this.left?.getViews().forEach((view) => {
            view.onDraw(layout)
        })

        this.spin?.getViews().forEach((view) => {
            view.onDraw(layout)
        })
    }

    private createObjects() {
        this.createSpin()
        this.createStop()
        this.createLeft()
        this.createSpeed()
        this.createAuto()
    }

    private addPrefab(views: View[]) {
        const parent = this.getContainer()
        if (!parent) return

        views.forEach((view) => {
            const container = view.getContainer()
            if (container) parent.addChild(container)
        })
    }

    private createSpin() {
        this.spin = new SpinButtonPrefab()
        this.spin.initial()
        this.spin.size(272, 272)

        this.addPrefab(this.spin.getViews())
    }

    private createStop() {
        this.stop = new StopButtonPrefab()
        this.stop.initial()

        this.addPrefab(this.stop.getViews())
    }

    private createLeft() {
        this.left = new AutoSpinLeftPrefab()
        this.left.initial()

        this.addPrefab(this.left.getViews())
    }

    private createSpeed() {
        this.speed = new SpeedButtonPrefab()
        this.speed.initial()
        this.speed.size(144, 144)

        this.addPrefab(this.speed.getViews())
        this.speed.position(-245, 0)
    }

    private createAuto() {
        this.auto = new AutoButtonPrefab()
        this.auto.initial()
        this.auto.size(144, 144)

        this.addPrefab(this.auto.getViews())
        this.auto.position(245, 0)
    }
}