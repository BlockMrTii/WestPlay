/**
 * TruckersMP's other players' dots as the player chooses them (the companion's Map page; issue #96): how strongly
 * they show and how large they are. The host sends each in percent (`westplay_host::settings::PlayerOpacity`,
 * `PlayerSize`); the map takes them as shares.
 */

/** Each one's range (percent) and its share before it could be chosen, still the default. */
export const PLAYER_DOTS = {
  opacity: { min: 20, max: 100, fallback: 0.7 },
  size: { min: 50, max: 250, fallback: 1 },
}

/** A percent the host sends, as a share: kept within `range`; its `fallback` for anything that isn't a number (a
 * host from before it sent it). */
export function shareOf(value: unknown, range: { min: number; max: number; fallback: number }): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return range.fallback
  return Math.min(range.max, Math.max(range.min, value)) / 100
}
