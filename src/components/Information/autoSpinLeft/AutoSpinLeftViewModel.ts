import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { AutoSpinLeftView } from "./AutoSpinLeftView";
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';
import { language } from '../../../utility/Language';
import { useActiveResultStore } from '../../../stores/useActiveResultStore';

export class AutoSpinLeftViewModel {

    private unScribes: UnSubscribes = null

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: AutoSpinLeftView) {
        this.release()

        this.unScribes = [
            useGameUiStore.gamePhase.subscribe(
                (cur) => {
                    if (cur === 'freeSpin') this.setLayout(view, true)
                    else if (cur === 'regular') this.setLayout(view, false)
                }
            ),
            useGameUiStore.autoSpinLeft.subscribe(
                (cur) => {
                    const text = view.getObject('autoSpinLeft') as PIXI.BitmapText
                    if (text) text.text = cur < 0 ? '?' : cur // TODO : infinite
                }
            ),
            useGameUiStore.freeSpinLeft.subscribe(
                (cur) => {
                    const text = view.getObject('freeSpinLeft') as PIXI.BitmapText
                    if (text) text.text = cur
                }
            ),
            useGameUiStore.spinState.subscribe(
                (cur) => {
                    const container = view.getContainer()
                    if (container) container.visible = ((cur & (SpinState.AutoSpin | SpinState.FreeSpin | SpinState.MiniGame | SpinState.WheelGame)) != SpinState.None)
                }
            ),
            this.registerLocalization(view),
            this.registerClickEvent(view)
        ]
    }

    private setLayout(view: AutoSpinLeftView, isFreeGame: boolean) {
        const background = view.getObject('background') as PIXI.Sprite
        if (background) background.texture  = PIXI.Assets.get(isFreeGame ? 'spinButton/buttonFree.png' : 'spinButton/buttonAuto.png')

        const auto = view.getObject('autoMessage') as PIXI.Text
        if (auto) auto.visible = !isFreeGame

        const free = view.getObject('freeMessage') as PIXI.Text
        if (free) free.visible = isFreeGame

        const autoSpinLeft = view.getObject('autoSpinLeft') as PIXI.BitmapText
        if (autoSpinLeft) autoSpinLeft.visible = !isFreeGame

        const freeSpinLeft = view.getObject('freeSpinLeft') as PIXI.BitmapText
        if (freeSpinLeft) freeSpinLeft.visible = isFreeGame
    }

    private registerLocalization(view: AutoSpinLeftView) {
        const refresh = () => {
            const auto = view.getObject('autoMessage') as PIXI.Text
            if (auto) auto.text = `${language.text('SPIN_AUTO_TITLE')}\n${language.text('SPIN_AUTO_INFO')}`

            const free = view.getObject('freeMessage') as PIXI.Text
            if (free) free.text = `${language.text('SPIN_FREE_TITLE')}\n${language.text('SPIN_FREE_INFO')}`
        }

        refresh()
        return useActiveResultStore.subscribe(
            (state) => state.data,
            (cur) => {
                refresh()
            }
        )
    }

    private registerClickEvent(view: AutoSpinLeftView) {
        const background = view.getObject('background') as PIXI.Sprite
        if (!background) return () => {}

        background.on('pointerup', () => {
            const flag = useGameUiStore.spinState.get()
            const autoSpinLeft = view.getObject('autoSpinLeft') as PIXI.BitmapText
            if (autoSpinLeft.visible) useGameUiStore.spinState.set(flag & ~(SpinState.AutoSpin | SpinState.TurboSpin))
        })
    
        return () => {
            background.off('pointerup')
        }
    }
}