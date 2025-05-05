import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../../observable/Observable";
import { AnnouncementView } from './AnnouncementView';
import { SpinState, useGameUiStore } from '../../../stores/useGameUiStore';

enum AnnouncementState {
    isIdle = 1 << 0,
    showTotalWin = 1 << 1,
    showPayLine = 1 << 2,
}

export class AnnouncementViewModel {

    private unScribes: UnSubscribes = null

    private state = Observable<number>(0)

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: AnnouncementView) {
        this.release()

        this.unScribes = [
            useGameUiStore.spinState.subscribe((cur) => {
                if (cur == SpinState.None) this.addStateFlag(AnnouncementState.isIdle)
                else this.removeStateFlag(AnnouncementState.isIdle)
            }),
            useGameUiStore.totalWin.subscribe((cur) => {
                if (0 < cur.value) this.addStateFlag(AnnouncementState.showTotalWin)
                else this.removeStateFlag(AnnouncementState.showTotalWin)
            }),
            useGameUiStore.payout.subscribe((cur) => {
                if (1 == cur.length) this.addStateFlag(AnnouncementState.showPayLine)
                else this.removeStateFlag(AnnouncementState.showPayLine)
            }),
            this.state.subscribe((cur) => {
                this.toggleAnnouncement(view, cur)
            }),
        ]
    }

    private addStateFlag(flag: AnnouncementState) {
        const current = this.state.get()
        this.state.set(current | flag)
    }

    private removeStateFlag(flag: AnnouncementState) {
        const current = this.state.get()
        this.state.set(current & ~flag)
    }

    private hasStateFlag(flag: number) {
        const current = this.state.get()
        return (current & flag) != 0
    }

    private toggleAnnouncement(view: AnnouncementView, state: number) {
        if (this.hasStateFlag(AnnouncementState.showPayLine | AnnouncementState.showTotalWin)) {
            const spinToWin = view.getBetStateIdleMessage()
            if (spinToWin) spinToWin.show(false)

            const goodLuck = view.getBetStateRunMessage()
            if (goodLuck) goodLuck.show(false)
        }
        else {
            const isIdle = this.hasStateFlag(AnnouncementState.isIdle)
            const spinToWin = view.getBetStateIdleMessage()
            if (spinToWin) spinToWin.show(isIdle)

            const goodLuck = view.getBetStateRunMessage()
            if (goodLuck) goodLuck.show(!isIdle)
        }
    }
}