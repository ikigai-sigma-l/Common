import { View } from "../../core/View"

export abstract class WinSymbolPrefab {

    public abstract initial(): void

    public abstract release(): void

    public abstract getViews(): View[]

    public abstract setPosition(x: number, y: number): void

    public abstract width(): number 
}