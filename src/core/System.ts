import * as PIXI from 'pixi.js'
import { Layout } from './View'

export abstract class System {
  private container: PIXI.Container | null = new PIXI.Container()

  public abstract initial(): void
 
  public release(): void {
    this.container?.parent?.removeChild(this.container)
    this.container?.destroy()
    this.container = null
  }

  public abstract onDraw(layout: Layout): void 

  public getContainer() {
    return this.container
  }
}
