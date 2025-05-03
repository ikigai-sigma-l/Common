import * as PIXI from 'pixi.js'
import { View } from '../../../core/View'
import { SpinMaskButtonView } from './SpinMaskButtonView'
import { SpinButtonViewModel } from "./SpinButtonViewModel"
import { SpinMaskButtonViewModel } from './SpinMaskButtonViewModel'
import { SpinButtonView } from './SpinButtonView'
import { SpinButtonModel } from './SpinButtonModel'
import { SpinButtonAnimViewModel } from './SpinButtonAnimViewModel'

export class SpinButtonPrefab {
    private model: SpinButtonModel = new SpinButtonModel()
    private view: SpinButtonView | null = null
    private spinMask: SpinMaskButtonView | null = null
    private spinAnim: SpinButtonAnimViewModel | null = null
    private viewModel: SpinButtonViewModel | null = null
    private spinMaskViewModel: SpinMaskButtonViewModel | null = null

    public initial() {
        this.view = new SpinButtonView()
        this.view.initial()

        this.spinMask = new SpinMaskButtonView()
        this.spinMask.initial()

        this.spinAnim = new SpinButtonAnimViewModel()
        this.spinAnim.initial()
        this.spinAnim.bind(this.model, this.view)

        this.viewModel = new SpinButtonViewModel()
        this.viewModel.initial()
        this.viewModel.bind(this.model, this.view)

        this.spinMaskViewModel = new SpinMaskButtonViewModel()
        this.spinMaskViewModel.initial()
        this.spinMaskViewModel.bind(this.spinMask)
    }

    public release() {
        this.spinMaskViewModel?.release()
        this.spinMaskViewModel = null

        this.spinAnim?.release()
        this.spinAnim = null

        this.viewModel?.release()
        this.viewModel = null

        this.spinMask?.release()
        this.spinMask = null

        this.view?.release()
        this.view = null
    }

    public getViews() {
        const list: View[] = []
        if (this.view) list.push(this.view)
        if (this.spinMask) list.push(this.spinMask)
        return list
    }

    public position(x: number, y: number) {
        this.getViews().forEach((view) => {
            const container = view.getContainer()
            if (container) container.position.set(x, y)
        })
    }

    public size(width: number, height: number) {
        const background = this.view?.getObject('background') as PIXI.Sprite
        if (background) {
            background.width = width
            background.height = height
        }

        const arrow = this.view?.getObject('arrow') as PIXI.Sprite
        if (arrow) {
            arrow.width = width
            arrow.height = height
        }

        const icon = this.view?.getObject('icon') as PIXI.Sprite
        if (icon) {
            icon.width = width
            icon.height = height
        }
        
        const turboMask = this.spinMask?.getObject('turboMask') as PIXI.Sprite
        if (turboMask) {
            turboMask.width = width
            turboMask.height = height
        }
    }
}

