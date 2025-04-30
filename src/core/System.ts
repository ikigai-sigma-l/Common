import { Register } from './View'

export abstract class System {
  public abstract initial(register: Register): void
  public abstract release(): void
}
