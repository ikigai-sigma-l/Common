export function clamp01(val: number): number {
  return Math.min(1, Math.max(0, val))
}
