import { System } from "../../core/System";
import { Layout, View } from "../../core/View";
import { UnSubscribes } from "../../observable/Observable";
import { ControlPanelPrefab } from "../../components/controlPanel/ControlPanelPrefab";
import { SpinState, useGameUiStore } from "../../stores/useGameUiStore";
import { InfoPanelPrefab } from "../../components/infoPanel/InfoPanelPrefab";

export class UiSystem extends System {
    private unSubscribes: UnSubscribes = null

    private controlPanel: ControlPanelPrefab | null = null
    private InfoPanel: InfoPanelPrefab | null = null

    public initial() {
        const views: View[] = []

        views.push(...this.createControlPanel())
        views.push(...this.createInfoPanel())
        
        const root = this.getContainer()
        views.forEach((view) => {
            const container = view.getContainer()
            if (container) root?.addChild(container)
        })

        this.observer()
    }
  
    public release() {
        this.unObserver()

        this.controlPanel?.release()
        this.controlPanel = null

        this.InfoPanel?.release()
        this.InfoPanel = null
    }

    public onDraw(layout: Layout): void {
        this.controlPanel?.getViews().forEach((view) => view.onDraw(layout))
        this.InfoPanel?.getViews().forEach((view) => view.onDraw(layout))
    }

    private observer() {
        this.unSubscribes = [
            useGameUiStore.gamePhase.subscribe((cur) => {
                let spinState = useGameUiStore.spinState.get()

                // when change game phase disable turbo spin
                spinState &= ~SpinState.TurboSpin

                if (cur === 'freeSpin') spinState |= SpinState.FreeSpin
                else spinState &= ~SpinState.FreeSpin

                if (cur === 'wheelGame') spinState |= SpinState.WheelGame
                else spinState &= ~SpinState.WheelGame

                if (cur === 'miniGame') spinState |= SpinState.MiniGame
                else spinState &= ~SpinState.MiniGame

                useGameUiStore.spinState.set(spinState)
            })
        ]
    }
    
    private unObserver() {
        this.unSubscribes?.forEach((subscribe) => {
          if (subscribe) subscribe()
        })
        this.unSubscribes = null
    }

    private createControlPanel() {
        this.controlPanel = new ControlPanelPrefab()
        this.controlPanel.initial()
        return [...this.controlPanel.getViews()]
    }

    private createInfoPanel() {
        this.InfoPanel = new InfoPanelPrefab()
        this.InfoPanel.initial()
        return [...this.InfoPanel.getViews()]
    }
}