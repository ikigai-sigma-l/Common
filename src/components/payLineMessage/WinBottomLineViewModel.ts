import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { WinBottomLineView } from './WinBottomLineView';
import { useGameUiStore } from '../../stores/useGameUiStore';
import { Payout } from '../../schame/BetResponse';
import { formatNumber } from '../../utility/FormatUtility';
import { useActiveResultStore } from '../../stores/useActiveResultStore';
import { language } from '../../utility/Language';
import { formatString } from '../../../src/utility/FormatUtility'


export class WinBottomLineViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: WinBottomLineView) {
        this.release()

        this.unScribes = [
            useGameUiStore.payout.subscribe((cur) => {
                this.refreshMessage(view)
                this.refreshWinMoney(view, cur)
                this.setVisible(view, cur)
                view.align()
            }),
            this.registerCurrency(view)
        ]
    }

    private refreshMessage(view: WinBottomLineView) {
        const payout = useGameUiStore.payout.get()
        if (payout.length != 1) return

        const message = view.getObject('message') as PIXI.Text
        if (message) message.text = formatString(language.text('WIN_LINES'), [payout[0].positions + 1])
    }

    private refreshWinMoney(view: WinBottomLineView, payout: Payout[]) {
        if (payout.length != 1) return

        const text = view.getObject('winMoney') as PIXI.BitmapText
        if (text) text.text = formatNumber(payout[0].coins)
    }

    private setVisible(view: WinBottomLineView, payout: Payout[]) {
        const container = view.getContainer()
        if (container) container.visible = payout.length == 1
    }

    private registerCurrency(view: WinBottomLineView) {
        const refresh = () => {
            const currency = view.getObject('winCurrency') as PIXI.BitmapText
            if (currency) {
                currency.text = useActiveResultStore.getState().getCurrency().code
                view.align()
            }
        }
        
        refresh()
        return useActiveResultStore.subscribe(
            (state) => state.data,
            (cur) => refresh()
        )
    }
}