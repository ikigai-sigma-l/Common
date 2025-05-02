import { View, Layout, Style } from '../../core/View';

export enum ButtonState {
    Normal,
    Focus,
    Push,
    Disable,
}

export const getStateName = (state: ButtonState) => {
    switch(state)
    {
        case ButtonState.Normal: return 'normal' 
        case ButtonState.Focus: return 'focus'
        case ButtonState.Push: return 'push'
        case ButtonState.Disable: return 'disable'
    }
}

export class ButtonView extends View {

    public initial(): void {
        this.createObjects()
      }

    public release(): void {
        super.release()
    }

    public onDraw(layout: Layout) {

    }

    private createObjects() {
        this.createBackground()
    }
    
    private createBackground() {
        const background = this.createSprite(`background`)
        if (!background) return

        background.anchor.set(0.5)
        background.position.set(0)
        background.eventMode = 'static'
        background.cursor = 'pointer'
    }
}