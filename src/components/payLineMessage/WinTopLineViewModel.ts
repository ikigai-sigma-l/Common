import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { useGameUiStore } from '../../stores/useGameUiStore';
import { WinTopLineView } from './WinTopLineView';
import { formatNumber } from '../../utility/FormatUtility';
import { Tween } from '../../core/Tween';
import { useActiveResultStore } from '../../stores/useActiveResultStore';
import { language } from '../../utility/Language';


export class WinTopLineViewModel {

    private langKey = Observable<string>('GAME_RESULT_WIN')

    private winMoney = Observable<number>(0)

    private anim: Tween | null = null

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.stopAnimation()

        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: WinTopLineView) {
        this.release()

        this.unScribes = [
            useGameUiStore.totalWin.subscribe((cur) => {
                this.stopAnimation()
                if (0 < cur.duration) this.playAnimation(cur.value, cur.duration)
                else this.winMoney.set(cur.value)
            }),
            useGameUiStore.gamePhase.subscribe((cur) => {
                this.langKey.set(cur === 'freeSpin' ? 'GAME_RESULT_TOTAL_WIN' : 'GAME_RESULT_WIN')
            }),
            this.winMoney.subscribe((cur) => {
                this.updateWinMoney(view, cur)
                this.setVisible(view, cur)
            }),
            this.langKey.subscribe((cur) => {
                const message = view.getObject('message') as PIXI.Text
                if (message) message.text = language.text(cur)
                view.align()
            }),
            useActiveResultStore.subscribe(
                (state) => state.data,
                (cur) => {
                    const currency = view.getObject('winCurrency') as PIXI.Text
                    if (currency) {
                        currency.text = useActiveResultStore.getState().getCurrency().code
                        view.align()
                    }
                }
            )
        ]
    }

    private updateWinMoney(view: WinTopLineView, totalWin: number) {
        const text = view.getObject('winMoney') as PIXI.Text
        if (text) text.text = formatNumber(totalWin)

        view.align()
    }

    private setVisible(view: WinTopLineView, totalWin: number) {
        const container = view.getContainer()
        if (container) container.visible = 0 < totalWin
    }

    private stopAnimation() {
        this.anim?.stop()
        this.anim = null
    }

    private playAnimation(value: number, duration: number) {
        this.stopAnimation()

        const current = this.winMoney.get()

        this.anim = new Tween().duration(duration, (ratio) => {
            this.winMoney.set(current + (value - current) * ratio)
        }).onComplete(() => {
            this.winMoney.set(value)
        })

        this.anim.start()
    }
}