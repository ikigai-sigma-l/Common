import * as PIXI from 'pixi.js'
import { useLoadingStore } from 'src/stores/useLoadingStore'

export class Preload {
  private loader: Promise<void> | null = null

  constructor(list: string[]) {
    let percent = 0
    const step = list.length == 0 ? 1 : 1 / list.length

    useLoadingStore.setState({ percent: percent })

    this.loader = new Promise((resolve, reject) => {
      let promiser: Promise<any> = Promise.resolve()
      list.forEach((item, idx) => {
        promiser = promiser.then(() => {
          return PIXI.Assets.load(item, (progress) => {
            useLoadingStore.setState({ percent: percent + progress * step })
          }).then(() => {
            percent += step
          })
        })
      })

      promiser
        .then(() => {
          useLoadingStore.setState({ percent: 1 })
          resolve()
        })
        .catch((ex) => {
          console.error(ex)
          reject(ex)
        })
    })
  }

  public onComplete(callback: () => void) {
    let handler = () => {}
    new Promise<void>((resolve, reject) => {
      this.loader?.then(() => {
        resolve()
      })
      handler = reject
    })
      .then(() => {
        callback()
      })
      .catch(() => {})

    return handler
  }
}
