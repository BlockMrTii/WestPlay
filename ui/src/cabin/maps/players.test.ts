import { describe, expect, it } from 'vitest'
import { PLAYER_DOTS, shareOf } from './playerDots'
import { mapStyle, paintFor, PLAYERS_LAYER, playerPaint } from './style'

describe("the other players' dots (issue #96)", () => {
  it('scale their radius and edge at every zoom, and show fill and edge as strongly', () => {
    const paint = playerPaint(0.4, 2)
    expect(paint['circle-opacity']).toBe(0.4)
    expect(paint['circle-stroke-opacity']).toBe(0.4)
    expect(paint['circle-radius']).toEqual(['interpolate', ['linear'], ['zoom'], 9, 5, 13, 8, 16, 12, 18, 18])
    expect(paint['circle-stroke-width']).toEqual(['interpolate', ['linear'], ['zoom'], 9, 2, 16, 4])
  })

  it('look as before by default', () => {
    expect(playerPaint(0.7, 1)['circle-radius']).toEqual([
      'interpolate',
      ['linear'],
      ['zoom'],
      9,
      2.5,
      13,
      4,
      16,
      6,
      18,
      9,
    ])
  })

  it("keep the player's opacity and size as the appearance changes, and their colours restyled", () => {
    const players = paintFor('dark').filter((each) => each.layer === PLAYERS_LAYER)
    expect(players.map((each) => each.property).sort()).toEqual(['circle-color', 'circle-stroke-color'])
  })

  it('are only in the style of a map with its data', () => {
    expect(mapStyle('light', null).layers.some((layer) => layer.id === PLAYERS_LAYER)).toBe(false)
  })

  it("take the host's percent as a share, kept within its range", () => {
    expect(shareOf(70, PLAYER_DOTS.opacity)).toBe(0.7)
    expect(shareOf(5, PLAYER_DOTS.opacity)).toBe(0.2)
    expect(shareOf(999, PLAYER_DOTS.size)).toBe(2.5)
    expect(shareOf(undefined, PLAYER_DOTS.opacity)).toBe(0.7)
    expect(shareOf('80', PLAYER_DOTS.opacity)).toBe(0.7)
    expect(shareOf(Number.NaN, PLAYER_DOTS.size)).toBe(1)
  })
})
