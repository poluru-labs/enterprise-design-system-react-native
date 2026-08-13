export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function clampNumber(value: number, min: number, max: number): number {
  return clamp(value, min, max);
}

export function formatCount(value: number): string {
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
}

export type EdsDensity = 'comfortable' | 'compact';

/** RN density is app-level; retained for API parity with web packages. */
export function setDensity(_density: EdsDensity): void {
  // no-op on native — consumers can wire AppState/Context as needed
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
