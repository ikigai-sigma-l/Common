//import { AutoPlayPrefab } from "../../components/autoplay/AutoPlayPrefab";
import { BetSelectorPrefab } from "../../components/betSelector/BetSelectorPrefab";
import { BlockPrefab } from "../../components/block/BlockPrefab";
import { SettingPrefab } from "../../components/setting/SettingPrefab";
import { System } from "../../core/System";
import { View, Register } from "../../core/View";
import { UnSubscribes } from "../../observable/Observable";


export class PopUpSystem extends System {
    private unSubscribes: UnSubscribes = null

    private block: BlockPrefab | null = null
    //private autoplay: AutoPlayPrefab | null = null
    private betSelector: BetSelectorPrefab | null = null
    private setting: SettingPrefab | null = null

    public initial(register: Register) {
        const views: View[] = []

        views.push(...this.createBlock())
        //views.push(...this.createAutoPlay())
        views.push(...this.createBetSelector())
        views.push(...this.createSetting())
        
        if (register) register(views)

        this.observer()
    }
  
    public release() {
        this.unObserver()

        this.betSelector?.release()
        this.betSelector = null
        //this.autoplay?.release()
        //this.autoplay = null
        this.block?.release()
        this.block = null
    }

    private observer() {
        this.unSubscribes = [
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
/*
    private createAutoPlay() {
        this.autoplay = new AutoPlayPrefab()
        this.autoplay.initial()

        return this.autoplay.getViews()
    }
*/
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
 }