import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { SpinState, useGameUiStore } from '../../stores/useGameUiStore';
import { BetSelectorButtonModel } from './BetSelectorButtonModel';
import { BetSelectorButtonView } from './BetSelectorButtonView';
import { useActiveResultStore } from '../../stores/useActiveResultStore';

export class BetSelectorButtonViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: BetSelectorButtonModel, view: BetSelectorButtonView) {
        this.release()

        this.unScribes = [
            model.betValue.subscribe(
                (cur) => {
                    const betValue = view.getObject('betValue') as PIXI.Text
                    if (betValue) { 
                        betValue.text = cur
                        this.updateLayout(view)
                    }

                    const container = view.getContainer()
                    if (container) container.visible = 0 < cur
                }
            ),
            model.isOn.subscribe(
                (cur) => {
                    const select = view.getObject('select') as PIXI.Graphics
                    if (select) select.visible = cur

                    const code = view.getObject('code') as PIXI.Text
                    if (code) code.style.fill = cur ? '#FFFFFF' : '#9399A7'
                }
            ),
            model.style.subscribe(
                (cur) => {
                    const frame = view.getObject('frame') as PIXI.Graphics
                    if (frame) frame.clear()
                                        .roundRect(cur.width * -0.5, cur.height * -0.5, cur.width, cur.height, cur.round)
                                        .fill('#333843')

                    const select = view.getObject('select') as PIXI.Graphics
                    if (select) select.clear()
                                        .roundRect(cur.width * -0.5, cur.height * -0.5, cur.width, cur.height, cur.round)
                                        .fill('#107D42')

                    const betValue = view.getObject('betValue') as PIXI.Text
                    if (betValue) betValue.style.fontSize = cur.headSize
                    
                    const code = view.getObject('code') as PIXI.Text
                    if (code) code.style.fontSize = cur.contentSize     

                    this.updateLayout(view)
                }
            ),
            this.registerCurrency(view),
            this.registerClickEvent(model, view),
        ]
    }

    private registerCurrency(view: BetSelectorButtonView) {
        const refresh = () => {
            const text = view.getObject('code') as PIXI.Text
            if (text) {
                text.text = useActiveResultStore.getState().getCurrency().code
                this.updateLayout(view)
            }
        }

        refresh()
        return useActiveResultStore.subscribe(
            (state) => state.data,
            (cur) => refresh()
        )
    }
    
    private registerClickEvent(model: BetSelectorButtonModel, view: BetSelectorButtonView) {
        const frame = view.getObject('frame') as PIXI.Graphics
        if (!frame) return () => {}

        const onButtonUp = () => {
            useGameUiStore.betValue.set(model.betValue.get())
        }
    
        frame.on('pointerdown', this.onButtonDown.bind(this))
    
        frame.on('pointerup', onButtonUp)
    
        return () => {
            frame.off('pointerdown')
            frame.off('pointerup')
        }
    }

    private updateLayout(view: BetSelectorButtonView) {
        const gap = 6
        const betValue = view.getObject('betValue') as PIXI.Text
        const code = view.getObject('code') as PIXI.Text

        const betValueWidth = betValue?.width ?? 0
        const codeWidth = code?.width ?? 0
        const length = betValueWidth + gap + codeWidth
        const start = length * -0.5

        if (betValue) betValue.position.set(start, 0)
        if (code) code.position.set(start + betValueWidth + gap, 2)
    }
    
    private onButtonDown() {
    }
}