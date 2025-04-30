import { Observable } from "./Observable";

export class Trigger {
    private state = Observable<boolean>(false)
    private listener: Promise<void> | null = null
    private dispose: (() => void) | null = null

    public initial() {
        this.listener = new Promise<void>((resolve) => {
            const unsubscribe = this.state.subscribe((cur) => {
                if (cur == true) resolve()
            })

            this.dispose = () => {
                if (unsubscribe) unsubscribe()
                resolve()
            }
        }).then(() => {
            if (this.dispose) this.dispose()
            this.dispose = null
        })
    }

    public listen() {
        return this.listener ? this.listener : Promise.resolve()
    }

    public reset() {
        if (this.dispose) this.dispose()
        this.dispose = null
        this.listener = null
        this.state.set(false)
    }

    public status() {
        return this.state.get()
    }

    public enable() {
        this.state.set(true)
    }
}