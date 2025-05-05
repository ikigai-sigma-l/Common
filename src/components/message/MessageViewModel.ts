import * as PIXI from 'pixi.js'
import { UnSubscribes } from "../../observable/Observable";
import { MessageModel } from './MessageModel';
import { MessageView } from './MessageView';


export class MessageViewModel {

    private unScribes: UnSubscribes = null

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: MessageModel, view: MessageView) {
        this.release()

        this.unScribes = [
            model.text.subscribe(
                (cur) => {
                    const text = view.getObject('text') as PIXI.Text
                    if (text) text.text = cur

                    view.drawFrame()
                }
            )
        ]
    }
}