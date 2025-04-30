class TweenTask {
  public life = 0
  public elapsed = 0
  public process: ((ratio: number) => void) | null = null

  private run(ratio: number) {
    if (this.process) this.process(ratio)
  }

  public exec(delta: number): number {
    this.elapsed += delta
    if (this.life <= this.elapsed) {
      this.run(1)
      return this.elapsed - this.life
    }
    this.run(this.elapsed / this.life)
    return 0
  }

  public clear() {
    this.process = null
  }
}

export class Tween {
  private tasks: TweenTask[] = []
  private finish: (() => void) | null = null
  private skip: (() => void) | null = null

  private clear() {
    this.tasks.forEach((task) => task.clear())
    this.tasks = []
    this.finish = null
    this.skip = null
  }

  public duration(val: number, onUpdate?: (ratio: number) => void): Tween {
    const task = new TweenTask()
    task.life = Math.max(0, val)
    task.process = onUpdate ?? null
    this.tasks.push(task)
    return this
  }

  public delay(val: number): Tween {
    const task = new TweenTask()
    task.life = Math.max(0, val)
    this.tasks.push(task)
    return this
  }

  public call(fn: () => void): Tween {
    const task = new TweenTask()
    task.life = 0
    task.process = (ratio: number) => {
      fn()
    }
    this.tasks.push(task)
    return this
  }

  public onComplete(val: () => void): Tween {
    this.finish = val
    return this
  }

  public onSkip(val: () => void): Tween {
    this.skip = val
    return this
  }

  public start(): () => void {
    tweenManager.add(this)
    return () => {
      this.stop()
    }
  }

  public stop() {
    if (this.skip) this.skip()
    this.clear()
  }

  public exec(delta: number): boolean {
    const tasks = this.tasks
    while (0 < (tasks?.length ?? 0)) {
      delta = tasks[0].exec(delta)
      if (delta <= 0) return true
      else tasks.shift()?.clear()
    }
    if (this.finish) this.finish()
    
    this.clear()
    return false
  }
}

class TweenManager {
  private list: Tween[] = []

  public process(delta: number) {
    const count = this.list.length
    for (let idx = 0; idx < count; ++idx) {
      const tween = this.list.shift()
      if (tween?.exec(delta)) this.list.push(tween)
    }
  }

  public add(tween: Tween) {
    this.list.push(tween)
  }
}

export const tweenManager = new TweenManager()
