import { MessagePrefab } from '../../../components/message/MessagePrefab';
//import { WinBottomLinePrefab } from 'src/components/payLineMessage/WinBottomLinePrefab';
//import { WinTopLinePrefab } from 'src/components/payLineMessage/WinTopLinePrefab';
import { View, Layout, Style } from '../../../core/View';
import { language } from '../../../utility/Language';

export class AnnouncementView extends View {

    private betStateIdle: MessagePrefab | null = null
    private betStateRun: MessagePrefab | null = null
    //private winBottomLine: WinBottomLinePrefab | null = null
    //private winTopLine: WinTopLinePrefab | null = null

    public initial(): void {
        this.createObjects()
    }

    public release(): void {
        this.betStateIdle?.release()
        this.betStateIdle = null

        this.betStateRun?.release()
        this.betStateRun = null

        //this.winBottomLine?.release()
        //this.winBottomLine = null

        //this.winTopLine?.release()
        //this.winTopLine = null

        super.release()
    }

    public onDraw(layout: Layout) {
        this.drawBetStateIdleMsg(layout)
        this.drawBetStateRunMsg(layout)
        //this.drawWinBottomLine(layout)
        //this.drawWinTopLine(layout)
    }

    private createObjects() {
        this.createBetStateIdleMsg()
        this.createBetStateRunMsg()
        //this.createWinBottomLine()
        //this.createWinTopLine()
    } 

    private addPrefab(views: View[]) {
        const parent = this.getContainer()
        if (!parent) return

        views.forEach((view) => {
            const container = view.getContainer()
            if (container) parent.addChild(container)
        })
    }

    private createBetStateIdleMsg() {
        this.betStateIdle = new MessagePrefab()
        this.betStateIdle.initial()
        this.betStateIdle.text(language.text('BET_STATE_IDLE'))

        this.addPrefab(this.betStateIdle.getViews())
    }

    private createBetStateRunMsg() {
        this.betStateRun = new MessagePrefab()
        this.betStateRun.initial()
        this.betStateRun.text(language.text('BET_STATE_RUN'))

        this.addPrefab(this.betStateRun.getViews())
    }
/*
    private createWinBottomLine() {
        this.winBottomLine = new WinBottomLinePrefab()
        this.winBottomLine.initial()

        this.addPrefab(this.winBottomLine.getViews())

        this.winBottomLine.setPosition(0, 33)
    }

    private createWinTopLine() {
        this.winTopLine = new WinTopLinePrefab()
        this.winTopLine.initial()

        this.addPrefab(this.winTopLine.getViews())

        this.winTopLine.setPosition(0, -33)
    }
*/
    private drawBetStateIdleMsg(layout: Layout) {
        this.betStateIdle?.getViews().forEach((view) => view.onDraw(layout))
    }

    private drawBetStateRunMsg(layout: Layout) {
        this.betStateRun?.getViews().forEach((view) => view.onDraw(layout))
    }
/*
    private drawWinBottomLine(layout: Layout) {
        this.winBottomLine?.getViews().forEach((view) => view.onDraw(layout))

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.winBottomLine?.setPosition(0, 20)
                break

            case Style.MobileHorizon:
                this.winBottomLine?.setPosition(0, 33)
                break

            case Style.Portrait:
                this.winBottomLine?.setPosition(0, 33)
                break
        }
    }

    private drawWinTopLine(layout: Layout) {
        this.winTopLine?.getViews().forEach((view) => view.onDraw(layout))

        switch(layout.style)
        {
            case Style.DesktopHorizon:
                this.winTopLine?.setPosition(0, -20)
                break

            case Style.MobileHorizon:
                this.winTopLine?.setPosition(0, -33)
                break

            case Style.Portrait:
                this.winTopLine?.setPosition(0, -33)
                break
        }
    }
*/
    public getBetStateIdleMessage() {
        return this.betStateIdle
    }

    public getBetStateRunMessage() {
        return this.betStateRun
    }
/*
    public getWinBottomLineMessage() {
        return this.winBottomLine
    }
*/
}