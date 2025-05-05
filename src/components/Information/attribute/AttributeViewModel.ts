import * as PIXI from 'pixi.js'
import { UnSubscribes } from "../../../observable/Observable";
import { AttributeModel } from './AttributeModel';
import { AttributeView } from './AttributeView';


export class AttributeViewModel {

    private unScribes: UnSubscribes = null

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(model: AttributeModel, view: AttributeView) {
        this.release()

        this.unScribes = [
            model.title.subscribe((cur) => {
                const title = view.getObject('title') as PIXI.Text
                if (title) title.text = cur
            }),
            model.value.subscribe((cur) => {
                const value = view.getObject('value') as PIXI.Text
                if (value) value.text = cur
            }),
        ]
    }
}