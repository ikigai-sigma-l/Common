import { PopUpState, usePopUpStore } from "../../stores/usePopUpStore";
import { AutoPlayPrefab } from "../../components/autoplay/AutoPlayPrefab";
import { BetSelectorPrefab } from "../../components/betSelector/BetSelectorPrefab";
import { BlockPrefab } from "../../components/block/BlockPrefab";
import { SettingPrefab } from "../../components/setting/SettingPrefab";
import { System } from "../../core/System";
import { Layout, View } from "../../core/View";
import { UnSubscribes } from "../../observable/Observable";


export class PopUpSystem extends System {
    private unSubscribes: UnSubscribes = null

    private block: BlockPrefab | null = null
    private autoplay: AutoPlayPrefab | null = null
    private betSelector: BetSelectorPrefab | null = null
    private setting: SettingPrefab | null = null

    public initial() {
        this.observer()
    }
  
    public release() {
        this.unObserver()

        this.releaseAllPrefab()

        super.release()
    }

    public onDraw(layout: Layout): void {
        this.block?.getViews().forEach((view) => view.onDraw(layout))
        this.betSelector?.getViews().forEach((view) => view.onDraw(layout))
        this.autoplay?.getViews().forEach((view) => view.onDraw(layout))
        this.setting?.getViews().forEach((view) => view.onDraw(layout))
    }

    private addPrefab(views: View[]) {
        const root = this.getContainer()
        views.forEach((view) => {
            const container = view.getContainer()
            if (container) root?.addChild(container)
        })
    }

    private observer() {
        this.unSubscribes = [
            usePopUpStore.current.subscribe(
                (cur) => {
                    this.releaseAllPrefab()
                    const views: View[] = []
                    if (cur !== PopUpState.None) {
                        views.push(...this.createBlock())
                    }

                    if (cur == PopUpState.AutoPlay) {
                        views.push(...this.createAutoPlay())
                    }

                    if (cur == PopUpState.BetSelector) {
                        views.push(...this.createBetSelector())
                    }

                    if (cur == PopUpState.Setting) {
                        views.push(...this.createBetSelector())
                    }

                    this.addPrefab(views)
                }
            )
        ]
    }
    
    private unObserver() {
        this.unSubscribes?.forEach((subscribe) => {
          if (subscribe) subscribe()
        })
        this.unSubscribes = null
    }

    private createBlock() {
        this.block = new BlockPrefab()
        this.block.initial()

        return this.block.getViews()
    }

    private createAutoPlay() {
        this.autoplay = new AutoPlayPrefab()
        this.autoplay.initial()

        return this.autoplay.getViews()
    }

    private createBetSelector() {
        this.betSelector = new BetSelectorPrefab()
        this.betSelector.initial()

        return this.betSelector.getViews()
    }

    private createSetting() {
        this.setting = new SettingPrefab()
        this.setting.initial()

        return this.setting.getViews()
    }

    private releaseAllPrefab() {
        this.betSelector?.release()
        this.betSelector = null
        this.autoplay?.release()
        this.autoplay = null
        this.setting?.release()
        this.setting = null
        this.block?.release()
        this.block = null
    }
 }