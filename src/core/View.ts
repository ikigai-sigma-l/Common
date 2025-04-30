import { Spine, SpineDebugRenderer } from '@esotericsoftware/spine-pixi-v8'
import { ScrollBox } from '@pixi/ui'
import * as PIXI from 'pixi.js'

export type Register = ((views: View[]) => void) | null

export enum Style {
  Portrait,
  DesktopHorizon,
  MobileHorizon,
}

export type Layout = {
  width: number,
  height: number,
  devicePixelRatio: number,
  artTextScale: number,
  aspectRatio: number,
  paddingX: number,
  paddingY: number,
  style: Style
}

export abstract class View {
  private pool: Map<string, any> | null = null

  private container: PIXI.Container | null = new PIXI.Container()

  public constructor() {
    this.createPool()
  }

  public getContainer() {
    return this.container
  }

  public getObject(key: string) {
    return this.pool?.get(key)
  }

  public hasObject(key: string) {
    return this.pool?.has(key)
  }

  public removeObject(key: string) {
    const obj = this.pool?.get(key)
    if (!obj) return
    this.pool?.delete(key)
    this.destroyObject(obj)
  }

  public release() {
    this.releaseContainer()
  }

  public abstract onDraw(layout: Layout): void

  protected addObject(key: string, obj: any) {
    if (!this.pool || !this.container) return false
    if (this.pool.has(key)) return false

    this.pool.set(key, obj)
    this.container?.addChild(obj)
  }

  protected createGraphic(id: string) {
    if (this.hasObject(id)) return null

    const graphics = new PIXI.Graphics()
    this.addObject(id, graphics)
    this.container?.addChild(graphics)
    return graphics
  }

  protected createSprite(id: string, path?: string) {
    if (this.hasObject(id)) return null

    const sprite = path ? PIXI.Sprite.from(path) : new PIXI.Sprite()
    this.addObject(id, sprite)
    this.container?.addChild(sprite)
    return sprite
  }

  protected createSpine(id: string, skel: string, atlas: string, scale: number) {
    if (this.hasObject(id)) return null

    const spine = Spine.from({ skeleton: skel, atlas: atlas, scale: scale })
    spine.autoUpdate = false
    spine.update(0)
    /*
    const renderer = new SpineDebugRenderer()
    
    renderer.drawMeshHull = false
    renderer.drawMeshTriangles = false
    renderer.drawBones = true
    renderer.drawPaths = false
    renderer.drawBoundingBoxes = false
    renderer.drawClipping = false
    renderer.drawRegionAttachments = false
    spine.debug = renderer
    */
    this.addObject(id, spine)
    this.container?.addChild(spine)
    return spine
  }

  protected createText(id: string) {
    if (this.hasObject(id)) return null

    const text = new PIXI.Text({ text: '' })

    this.addObject(id, text)
    this.container?.addChild(text)
    return text
  }

  protected createBitmapText(id: string) {
    if (this.hasObject(id)) return null

    const text = new PIXI.BitmapText({ text: ''})

    this.addObject(id, text)
    this.container?.addChild(text)
    return text
  }

  protected createScrollBox(id: string) {
    if (this.hasObject(id)) return null

    const scrollBox = new ScrollBox({width: 800, height: 600})
    this.addObject(id, scrollBox)
    this.container?.addChild(scrollBox)
    return scrollBox
  }

  private createPool() {
    if (this.pool) return false

    this.pool = new Map<string, any>()
    return true
  }

  private destroyPool() {
    this.pool?.forEach((object) => {
      this.destroyObject(object)
    })
    this.pool?.clear()
    this.pool = null
  }

  private destroyObject(object: PIXI.Container) {
    object?.parent?.removeChild(object)
    object?.destroy()
  }

  private releaseContainer() {
    this.destroyContainer()
    this.destroyPool()
  }

  private destroyContainer() {
    if (!this.container) return
    this.clearContainer()
    this.container.parent?.removeChild(this.container)
    this.container.destroy()
  }

  private clearContainer() {
    if (!this.container) return

    while (0 < this.container.children.length) {
      const child = this.container.getChildAt(0)
      this.container.removeChild(child)
    }
  }
}
