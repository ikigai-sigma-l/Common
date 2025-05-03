import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { TimerView } from './TimerView';
import { useTimerStore } from '../../stores/useTimerStore';


export class TimerViewModel {

    private unScribes: UnSubscribes = null

    private now = Observable<string>('')

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: TimerView) {
        this.release()

        this.unScribes = [
            useTimerStore.subscribe(
                (state) => state.currentMs,
                (cur) => {
                    this.now.set(
                        new Date(cur).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    )
                }
            ),
            this.now.subscribe((cur) => {
                const text = view.getObject('time') as PIXI.Text
                if (text) text.text = cur

                view.drawFrame()
            }),
        ]
    }
}