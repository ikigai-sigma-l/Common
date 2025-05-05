import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { BlockView } from './BlockView';
import { PopUpState, usePopUpStore } from '../../stores/usePopUpStore';

export class BlockViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: BlockView) {
        this.release()

        this.unScribes = []
    }
}