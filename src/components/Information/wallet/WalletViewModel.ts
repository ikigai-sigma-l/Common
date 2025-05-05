import * as PIXI from 'pixi.js'
import { UnSubscribes } from "../../../observable/Observable";
import { WalletView } from './WalletView';
import { useGameUiStore } from '../../../stores/useGameUiStore';
import { formatNumber } from '../../../utility/FormatUtility';


export class WalletViewModel {

    private unScribes: UnSubscribes = null

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: WalletView) {
        this.release()

        this.unScribes = [
            useGameUiStore.balance.subscribe((cur) => {
                const balance = view.getBalance()
                balance?.value(formatNumber(cur))
                view.updateLayout()
            }),
            useGameUiStore.betValue.subscribe((cur) => {
                const betValue = view.getBetValue()
                betValue?.value(cur.toString())
            })
        ]
    }
}