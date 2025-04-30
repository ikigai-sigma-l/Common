export type KeyFrame = {
  sec: number
  value: number
}

export class Animator {
  private keyFrames: KeyFrame[] = []

  public initial(keyFrames: KeyFrame[]) {
    this.keyFrames = keyFrames
  }

  public run(sec: number): number {
    let start = 0
    let end = 0
    let prev = 0
    let percent = 0

    for (let idx = 0; idx < this.keyFrames.length; ++idx) {
      if (sec < this.keyFrames[idx].sec) {
        percent = (sec - prev) / (this.keyFrames[idx].sec - prev)
        end = this.keyFrames[idx].value
        break
      }
      prev = this.keyFrames[idx].sec
      start = this.keyFrames[idx].value
    }

    return start + (end - start) * percent
  }
}
