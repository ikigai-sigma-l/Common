import * as PIXI from 'pixi.js'
import { View, Layout, Style } from './View'
import { Utils } from 'src/utility/Utils'

abstract class Core {
  public container: HTMLElement | null = null

  private app: PIXI.Application | null = null

  private root: PIXI.Container | null = null

  private views: View[] = []

  public createApplication(options?: Partial<PIXI.ApplicationOptions>): Promise<void> {
    if (!this.container || this.app) return Promise.resolve()

    this.app = new PIXI.Application()
    return this.app
      .init(options)
      .then(() => {
        const canvas = this.getCanvas()
        if (canvas) {
          this.container?.appendChild(canvas)
          this.createRoot()
          this.registerEvent()
        }
      })
  }

  public release() {
    this.unregisterEvent()
    this.removeView()
    this.removeRoot()
    this.releaseApplication()
  }

  private createRoot() {
    this.removeRoot()

    const stage = this.getStage()
    if (!stage) return

    this.root = new PIXI.Container()
    this.root.position.set(0)
    stage.addChild(this.root)
  }

  protected getStage() {
    return this.app?.stage
  }

  protected getCanvas() {
    return this.app?.canvas
  }

  protected getRenderer() {
    return this.app?.renderer
  }

  protected getWidth(): number {
    return this.container?.clientWidth ?? 1920
  }

  protected getHeight(): number {
    return this.container?.clientHeight ?? 1080
  }

  protected getViewPort() {
    /*
    const canvas = this.getCanvas()
    return {
      left: canvas?.offsetLeft ?? 0,
      top: canvas?.offsetTop ?? 0,
      width: canvas?.offsetWidth ?? 0,
      height: canvas?.offsetHeight ?? 0
    }
    */
    const left = (this.root?.position.x ?? 0)
    const top = (this.root?.position.y ?? 0)
    return {
      left: left,
      top: top,
      width: this.getWidth() - left * 2,
      height: this.getHeight() - top * 2
    }
  }

  protected getLayoutStyle() {
    if (this.getWidth() < this.getHeight()) return Style.Portrait
    return Utils.isMobile ? Style.MobileHorizon : Style.DesktopHorizon
  }

  protected getLayout() : Layout {
    const devicePixelRatio = this.getDevicePixelRatio()
    const aspectRatio = 1 / this.getAspectRatio()

    const viewPort = this.getViewPort()
    const width = Math.round(viewPort.width * aspectRatio)
    const height = Math.round(viewPort.height * aspectRatio)
    const paddingX = Math.round(viewPort.left * aspectRatio)
    const paddingY = Math.round(viewPort.top * aspectRatio)

    return {
      width: width,
      height: height,
      devicePixelRatio: devicePixelRatio,
      artTextScale: 1 / devicePixelRatio,
      aspectRatio: aspectRatio,
      paddingX: paddingX,
      paddingY: paddingY,
      style: this.getLayoutStyle()
    }
  }

  private getCanvasSize() {
    return { width: this.getCanvas()?.width ?? this.getWidth(), height: this.getCanvas()?.height ?? this.getHeight() }
  }

  private getAspectRatio() {
    return this.root?.scale.x ?? 1
  }

  protected getDevicePixelRatio(): number {
    return window.devicePixelRatio 
  }

  protected resize(width: number, height: number, aspectRatio: number, devicePixelRatio: number) {
    /*
    if (this.app?.renderer) this.app.renderer.resize(width, height, devicePixelRatio)
    if (this.root) this.root.scale.set(aspectRatio)
    */
    
    const containerWidth = this.getWidth()
    const containerHeight = this.getHeight()
    if (this.app?.renderer) this.app.renderer.resize(containerWidth, containerHeight, devicePixelRatio)
    if (this.root) {
      this.root.position.set((containerWidth - width) * 0.5, (containerHeight - height) * 0.5)
      this.root.scale.set(aspectRatio)
    }
  }

  protected redrawAll() {
    if (!this.root) return
    
    const layout = this.getLayout()

    this.views.forEach((view) => {
      view.onDraw(layout)
    })
  }

  protected addView(views: View[]) {
    if (!this.root) return

    const layout = this.getLayout()

    views.forEach((view) => {
      const container = view?.getContainer()
      if (container) {
        this.root?.addChild(container)
        this.views.push(view)
        view.onDraw(layout)
      }
    })
  }

  protected abstract onResizeHandle(width: number, height: number, devicePixelRatio: number): void

  protected abstract registerEvent(): void

  protected abstract unregisterEvent(): void

  private releaseApplication() {
    if (!this.app) return
    this.app.canvas.parentElement?.removeChild(this.app.canvas)
    /*
    if ('gl' in this.app.renderer) {
      ;(this.app.renderer.gl as WebGL2RenderingContext).getExtension('WEBGL_lose_context')?.loseContext()
    }
    */
    this.app.destroy(true)
    this.app = null
  }

  private removeRoot() {
    this.root?.parent?.removeChild(this.root)
    this.root?.destroy()
  }

  private removeView() {
    this.views = []
  }
}

export abstract class ContainerCore extends Core {
  private resizeObserver: ResizeObserver | null = null

  private resizeCallback: (() => void) | null = null

  private media: MediaQueryList | null = null

  protected registerEvent() {
    if (!this.container) return

    this.resizeCallback = this.onResize.bind(this)

    this.registerPixelRatioChange()

    this.resizeObserver = new ResizeObserver(this.resizeCallback)

    this.resizeObserver.observe(this.container)
  }

  protected unregisterEvent() {
    this.resizeObserver?.disconnect()
    this.resizeObserver = null

    this.unregisterPixelRatioChange()
  }

  protected onResize() {
    if (!this.container) return

    this.onResizeHandle(this.getWidth(), this.getHeight(), this.getDevicePixelRatio())
  }

  private registerPixelRatioChange() {
    this.unregisterPixelRatioChange()
    this.media = matchMedia(`(resolution: ${this.getDevicePixelRatio()}dppx)`)
    if (this.resizeCallback) this.media.addEventListener('change', this.resizeCallback)
  }

  private unregisterPixelRatioChange() {
    if (this.media && this.resizeCallback) this.media.removeEventListener('change', this.resizeCallback)
    this.media = null
  }
}
