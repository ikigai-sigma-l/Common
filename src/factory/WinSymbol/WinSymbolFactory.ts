import { WinSymbolPrefab } from "./WinSymbolPrefab"

type Factor = () => WinSymbolPrefab

class WinSymbolFactory {
    private factor: Factor | null = null

    public inject(factor: Factor) {
        this.factor = factor
    }

    public create() {
        return this.factor ? this.factor() : null
    }
}

export const winSymbolFactory: WinSymbolFactory = new WinSymbolFactory()