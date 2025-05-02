import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { useActiveResultStore } from '../../stores/useActiveResultStore';
import { BetSelectorButtonPrefab } from './BetSelectorButtonPrefab';
import { BetSelectorListModel } from './BetSelectorListModel';
import { BetSelectorListView } from './BetSelectorListView';
import { useGameUiStore } from '../../stores/useGameUiStore';
import { Style } from '../../core/View';
import { ButtonStyle } from './BetSelectorButtonModel';

export class BetSelectorListViewModel {

    private buttonList: BetSelectorButtonPrefab[] = []

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.clearSubscribes()
        this.clearButtonList()
    }

    public bind(model: BetSelectorListModel, view: BetSelectorListView) {
        this.clearSubscribes()
        this.bindButtonContainer(view)

        this.unScribes = [
            this.registerBetValueCount(model, view),
            useGameUiStore.betValue.subscribe(
                (cur) => {
                    const selIdx = this.buttonList.findIndex((btn) => btn.getBetValue() == cur)
                    this.buttonList.forEach((btn, idx) => {
                        btn.setSelect(idx == selIdx)
                    })
                }
            ),
            model.style.subscribe(
                (cur) => {
                    this.updateLayout(model, view)
                }
            ),
        ]
    }

    private bindButtonContainer(view: BetSelectorListView) {
        const container = view.getContainer()
        if (!container) return

        this.buttonList.forEach((btn) => {
            btn.getViews().forEach((view) => {
                const root = view.getContainer()
                if (root) container.addChild(root)
            })
        })
    }

    private clearButtonList() {
        this.buttonList.forEach((btn) => {
            btn.release()
        })

        this.buttonList = []
    }

    private clearSubscribes() {
        this.unScribes?.forEach((unScribe) => {
            if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    private addButton(view: BetSelectorListView) {
        const btn = new BetSelectorButtonPrefab()
        btn.initial()
        btn.getViews().forEach((item) => {
            const root = item.getContainer()
            if (root) view.getContainer()?.addChild(root)
        })

        this.buttonList.push(btn)

        return btn
    }

    private registerBetValueCount(model: BetSelectorListModel, view: BetSelectorListView) {
        const refresh = () => {
            const count = this.buttonList.length
            const total = useActiveResultStore.getState().getBets().length

            useActiveResultStore.getState().getBets().forEach((betValue, idx) => {
                const btn = idx < count ? this.buttonList[idx] : this.addButton(view)
                btn.setBetValue(betValue.value)
            })

            for(let idx = total; idx < this.buttonList.length; ++idx) {
                this.buttonList[idx].setBetValue(0)
            }

            this.updateLayout(model, view)
        }
    
        refresh()
        return useActiveResultStore.subscribe(
            (state) => state.data,
            (cur) => refresh()
        )
    }

    private updateLayout(model: BetSelectorListModel, view: BetSelectorListView) {
        const style = model.style.get()

        switch(style)
        {
            case Style.Portrait:
                this.align(202, 100.88, 92, 33, 26, 4)
                break
            case Style.MobileHorizon:
                this.align(200, 101.5, 92, 33, 26, 6)
                break
            case Style.DesktopHorizon:
                this.align(128, 56, 56, 20, 16, 4)
                break
        }
    }

    private align(btnWidth: number, btnHeight: number, round: number, titleSize: number, contentSize: number, rowSize: number) {
        const startX = btnWidth * 0.5
        const startY = btnHeight * 0.5
        const gap = 16

        const style: ButtonStyle = {
            width: btnWidth,
            height: btnHeight,
            round: round,
            headSize: titleSize,
            contentSize: contentSize,
        }

        this.buttonList.forEach((btn, idx) => {
            const row = idx % rowSize
            const col = Math.floor(idx /rowSize) 
            const top = startY + col * btnHeight + col * gap
            const left = startX + row * btnWidth + row * gap
            btn.setStyle(style)
            btn.position(left, top)
        })
    }
}